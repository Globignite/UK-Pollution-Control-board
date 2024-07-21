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
  TablePagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Complaints = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    fetchComplaints();
  }, []);
  // }, [page, rowsPerPage, searchTerm, statusFilter, startDate, endDate]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_COMPLAIANT_URL}/fetch-complaints`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          params: {
            page: page + 1,
            limit: rowsPerPage,
            complaintId: searchTerm,
            status: statusFilter,
            startDate: startDate,
            endDate: endDate,
          },
        }
      );
      console.log(response.data.data);
      setData(response.data.data);
      setTotalComplaints(response.data.pagination.total);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          onClick={fetchComplaints}
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
                  <TableCell>{file?.createdAt.split('T')[0]}</TableCell>
                  <TableCell>{file?.progress_date?.split('T')[0]}</TableCell>
                  <TableCell>{file?.resolve_date?.split('T')[0]}</TableCell>
                  <TableCell>
                    <Link to={`/dashboard/complaint/${file.complaintId}`}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalComplaints}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Container>
  );
};

export default Complaints;
