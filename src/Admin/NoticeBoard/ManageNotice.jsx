import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  Link,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GetMenu from "../Components/GetMenu";
import axios from "axios";

const ManageNotice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const defaultParams = {
        limit: limit,
        path: 'null/Notices',
        page: page,
      };
      const url = `${baseURL}?path=${defaultParams.path}&limit=${defaultParams.limit}&page=${defaultParams.page}&name=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch file");
      }

      console.log(response?.data?.data?.data);
      setNotifications(response?.data?.data?.data);
    } catch (error) {
      console.error("Error fetching file:", error);
      setNotifications([]);
    }
  };
 

  const handleDelete = async (href, name) => {
    if(confirm("Are you sure you want to delete " + name)){
      try {
        const reqData = {
          filePath: 'null/Notices',
          href: href
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
        fetchNotifications();
        alert("File deleted successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Error deleting file:", error);
      }
    }
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

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Manage Notices
      </Typography>

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
          type="date"
          value={endDate}
          margin="normal"
          onChange={(e) => handleDateChange("end", e.target.value)}
          label="End Date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
        <Button
          onClick={fetchNotifications}
          variant="contained"
          style={{ alignSelf: "center" }}
        >
          Apply Filters
        </Button>
      </Box>

      {notifications.length == 0 ? (
        <Typography variant="h6" gutterBottom>
          No Records
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ width: '60vw' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Publish Date</TableCell>
            
                <TableCell>File Type</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications?.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link href="#">{file?.name || 'N/A'}</Link>
                  </TableCell>
                  <TableCell>{file.createdAt.split('T')[0] || 'N/A'}</TableCell>
              
                  <TableCell>{file.type}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleDelete(file?.href,file?.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} 
    </Container>
  );
};

export default ManageNotice;
