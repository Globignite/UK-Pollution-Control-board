import { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../publicView/Components/Pagination";

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] = useState(0);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.get(
        "https://delightfulbroadband.com/api/enquiries/fetch-enquiries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: rowsPerPage,
            enquiryId: searchTerm,
            status: statusFilter,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            page: pageNo,
            limit: 10,
          },
        }
      );
      console.log(response.data.data);
      setData(response.data.data);
      setPaginationData(response.data.pagination);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };

  const setPage = (page) => {
    setPageNo(page);
  };

  useEffect(() => {
    fetchEnquiries();
  }, [pageNo]);

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

  const handleFilterClick = () => {
    setPageNo(1);
    fetchEnquiries();
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Enquiries
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Enquiry Number</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Enquiry Date</TableCell>
              <TableCell>Progress Start Date</TableCell>
              <TableCell>Resolved Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.status}</TableCell>
                <TableCell>{file.enquiryId}</TableCell>
                <TableCell>{file.subject}</TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{file?.progress_date?.split("T")[0]}</TableCell>
                <TableCell>{file?.resolve_date?.split("T")[0]}</TableCell>
                <TableCell>
                  <Link to={`/admin/enquiry/${file.enquiryId}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Enquiries;
