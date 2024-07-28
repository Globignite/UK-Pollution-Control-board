import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Link,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GetMenu from "../Components/GetMenu";
import axios from "axios";
import Spinner from "../../publicView/Components/Spinner";
import Pagination from "../../publicView/Components/Pagination";
import { toast } from "sonner";

const FileManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteFile, setDeleteFile] = useState({ href: "", name: "" });

  const fetchFiles = async (menu_path) => {
    setLoading(true);
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const defaultParams = {
        path: "null/About Us",
        limit: 10,
        page: pageNo,
      };

      const url = `${baseURL}?path=${menu_path}&limit=${defaultParams.limit}&page=${defaultParams.page}&name=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch file");
      }

      setData(response?.data);
    } catch (error) {
      console.error("Error fetching file:", error);
      setData([]);
    }
    setLoading(false);
  };

  const setPage = (page) => {
    setPageNo(page);
  };

  useEffect(() => {
    fetchFiles();
  }, [pageNo]);

  const handleDelete = async () => {
    setLoading(true);
    const { href, name } = deleteFile;
    try {
      const reqData = {
        filePath: data?.data?.filePath,
        href: href,
      };
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "https://delightfulbroadband.com/api/filesUpload/delete-file",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: reqData,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete file");
      }
      fetchFiles(data?.data?.filePath);
      toast.success("File deleted successfully", { duration: 3000 });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file", { duration: 3000 });
    }
    setLoading(false);
    setOpenDialog(false);
  };

  const handleOpenDialog = (href, name) => {
    setDeleteFile({ href, name });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  useEffect(() => {
    fetchFiles("");
  }, []);

  return (
    <Container>
      <Spinner loading={loading} />
      <Typography variant="h6" gutterBottom>
        Manage Files
      </Typography>
      {/* component for getting menu and sub menu */}
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        marginBottom={2}
      >
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
          variant="outlined"
          placeholder="Search"
          style={{ flex: 1 }}
        />
        <TextField
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          label="Start Date"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
        <TextField
          margin="normal"
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange("end", e.target.value)}
          label="End Date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
      </Box>
      <GetMenu menuPath={fetchFiles} />

      {data?.data?.data?.length === 0 || data?.data?.data == null ? (
        <Typography variant="h6" gutterBottom>
          No Records
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Files</TableCell>
                <TableCell>Uploaded</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.data?.map((ele, ind) => (
                <TableRow key={ind}>
                  <TableCell>
                    <Link href={`https://delightfulbroadband.com${ele?.href}`}>{ele?.name}</Link>
                  </TableCell>
                  <TableCell>{ele.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(ele.href, ele.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box>
        {paginationData.totalPages > 1 && (
          <Pagination
            pagination={paginationData}
            setPageNo={setPage}
            pageNo={pageNo}
          />
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {deleteFile.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FileManagement;
