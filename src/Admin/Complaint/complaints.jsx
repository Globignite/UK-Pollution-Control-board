import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../publicView/Components/Pagination";

const Complaints = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] = useState(0);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_COMPLAIANT_URL}/fetch-complaints`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            complaintId: searchTerm,
            status: statusFilter,
            startDate: startDate,
            endDate: endDate,
            page: pageNo,
            limit: 10,
          },
        }
      );
      console.log(response.data.pagination);
      setData(response.data.data);
      setPaginationData(response.data.pagination);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const setPage = (page) => {
    setPageNo(page);
  };

  useEffect(() => {
    fetchComplaints();
  }, [pageNo]);

  const handleFilterClick = () => {
    setPageNo(1);
    fetchComplaints();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

 

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Complaints
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
        <FormControl variant="outlined" margin="normal" style={{ flex: 1 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
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
          onClick={handleFilterClick}
          variant="contained"
          style={{ alignSelf: "center" }}
        >
          Apply Filters
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Complaint Number</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Complaint Date</TableCell>
                <TableCell>Progress Start Date</TableCell>
                <TableCell>Resolved Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{file?.status}</TableCell>
                  <TableCell>{file?.complaintId}</TableCell>
                  <TableCell>{file?.subject}</TableCell>
                  <TableCell>{file?.name}</TableCell>
                  <TableCell>{file?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{file?.progress_date?.split("T")[0]}</TableCell>
                  <TableCell>{file?.resolve_date?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Link to={`/admin/complaint/${file.complaintId}`}>
                      View
                    </Link>
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
    </Container>
  );
};

export default Complaints;
