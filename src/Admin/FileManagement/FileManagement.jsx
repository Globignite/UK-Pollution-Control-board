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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GetMenu from "../Components/GetMenu";
import axios from "axios";
import Spinner from "../../publicView/Components/Spinner";
import Pagination from "../../publicView/Components/Pagination";

const FileManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] = useState(0);

  const fetchFiles = async (menu_path) => {
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const defaultParams = {
        path: "null/About Us",
        limit: 5,
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

      console.log(response?.data?.pagination);
      setData(response?.data);
      setPaginationData(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching file:", error);
      setData([]);
    }
  };

  const setPage = (page) => {
    setPageNo(page);
  };

  useEffect(() => {
    fetchFiles();
  }, [pageNo]);

  const handleDelete = async (href, name) => {
    setLoading(true);
    if (confirm("Are you sure you want to delete " + name)) {
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
            data: reqData, // This is the correct place to put the data for delete request
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to delete file");
        }
        fetchFiles(data?.data?.filePath);
        alert("File deleted successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
    setLoading(false);
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
      {/* component for getting menu and sub menu  */}
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
                    <Link href="#">{ele.name}</Link>
                  </TableCell>
                  <TableCell>{ele.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <DeleteIcon
                        onClick={() => handleDelete(ele.href, ele.name)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box>
        {paginationData?.total > 1 && (
          <Pagination
            pagination={paginationData}
            setPageNo={setPage}
            pageNo={pageNo}
          />
        )}
      </Box>
    </Container>
  );
};

export default FileManagement;
