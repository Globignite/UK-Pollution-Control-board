// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   TablePagination,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Box,
// } from "@mui/material";

// import { Link } from "react-router-dom";

// const Complaints = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);





//   useEffect(() => {
//     // Simulate fetching data
//     const loadData = async () => {
//       // Here you would normally fetch from an API
//       const fetchedData = [
//         {
//           status: "New",
//           date: "2023-07-01",
//           subject: "Delivery Issue",
//           name: "Alice Johnson",
//           email: "alice.johnson@example.com",
//           phoneNumber: "9876543210",
//           progressStartDate: "2023-07-02",
//           resolvedDate: "2023-07-05",
//           complaintNumber: "CPN001",
//         },
//         {
//           status: "In Progress",
//           date: "2023-06-25",
//           subject: "Payment Refund",
//           name: "Bob Smith",
//           email: "bob.smith@example.com",
//           phoneNumber: "9876501234",
//           progressStartDate: "2023-06-26",
//           resolvedDate: "",
//           complaintNumber: "CPN002",
//         },
//         {
//           status: "Resolved",
//           date: "2023-06-20",
//           subject: "Warranty Claim",
//           name: "Carol White",
//           email: "carol.white@example.com",
//           phoneNumber: "9876201234",
//           progressStartDate: "2023-06-21",
//           resolvedDate: "2023-06-30",
//           complaintNumber: "CPN003",
//         },
//       ];
//       setData(fetchedData);
//       setFilteredData(fetchedData);
//     };
//     loadData();
//   }, []);

//   useEffect(() => {
//     filterData();
//   }, [searchTerm, statusFilter, startDate, endDate, data]);

//   const filterData = () => {
//     let filtered = data;

//     if (searchTerm) {
//       filtered = filtered.filter((entry) =>
//         Object.keys(entry).some((key) =>
//           entry[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(
//         (entry) => entry.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     if (startDate && endDate) {
//       filtered = filtered.filter((entry) => {
//         const entryDate = new Date(entry.date);
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         return entryDate >= start && entryDate <= end;
//       });
//     }

//     setFilteredData(filtered);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleStatusChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   const handleDateChange = (type, value) => {
//     if (type === "start") {
//       setStartDate(value);
//     } else {
//       setEndDate(value);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

  

//   return (
//     <Container>
//       <Typography variant="h6" gutterBottom>
//         Complaints
//       </Typography>
//       <Box
//         display="flex"
//         flexDirection="row"
//         flexWrap="wrap"
//         gap={2}
//         marginBottom={2}
//       >
//         <TextField
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           margin="normal"
//           variant="outlined"
//           placeholder="Search"
//           style={{ flex: 1 }}
//         />
//         <FormControl variant="outlined" margin="normal" style={{ flex: 1 }}>
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             label="Status"
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="New">New</MenuItem>
//             <MenuItem value="In Progress">In Progress</MenuItem>
//             <MenuItem value="Resolved">Resolved</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           label="Start Date"
//           margin="normal"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           style={{ flex: 1 }}
//         />
//         <TextField
//           type="date"
//           value={endDate}
//           margin="normal"
//           onChange={(e) => setEndDate(e.target.value)}
//           label="End Date"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           style={{ flex: 1 }}
//         />
//         <Button
//           onClick={filterData}
//           variant="contained"
//           style={{ alignSelf: "center" }}
//         >
//           Apply Filters
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Status</TableCell>
//               <TableCell>Complaint Number</TableCell>
//               <TableCell>Subject</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Complaint Date</TableCell>
//               <TableCell>Progress Start Date</TableCell>
//               <TableCell>Resolved Date</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((file, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{file.status}</TableCell>
//                   <TableCell>{file.enquiryNumber}</TableCell>
//                   <TableCell>{file.subject}</TableCell>
//                   <TableCell>{file.name}</TableCell>
//                   <TableCell>{file.date}</TableCell>
//                   <TableCell>{file.progressStartDate}</TableCell>
//                   <TableCell>{file.resolvedDate}</TableCell>
//                   <TableCell>
//                     <Link to={`/dashboard/complaint/${file.complaintNumber}`}>
//                       View
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>


//     </Container>
//   );
// };

// export default Complaints;

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
  }, [page, rowsPerPage, searchTerm, statusFilter, startDate, endDate]);

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
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
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
                  <TableCell>{file.status}</TableCell>
                  <TableCell>{file.complaintId}</TableCell>
                  <TableCell>{file.subject}</TableCell>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.createdAt.split('T')[0]}</TableCell>
                  <TableCell>{file.progressStartDate}</TableCell>
                  <TableCell>{file.resolvedDate}</TableCell>
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
