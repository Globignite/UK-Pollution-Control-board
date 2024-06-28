import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const files = [
  {
    date: "03/12/2023",
    subject:"my subject",
    name: "Suraj",
    email: "Suraj@gmail.com",
    phoneNumber:"9876543210",
    seenDate: "03/12/2023",
    respondedDate: "03/12/2023",
  },
  {
    date: "03/12/2023",
    subject:"my subject",
    name: "Monish",
    email: "Monish@gmail.com",
    phoneNumber:"9876543210",
    seenDate: "03/12/2023",
    respondedDate: "03/12/2023",
  },
  {
    date: "03/12/2023",
    subject:"my subject",
    name: "Bhanu",
    email: "Bhanu@gmail.com",
    phoneNumber:"9876543210",
    seenDate: "03/12/2023",
    respondedDate: "03/12/2023",
  },
];

const Enquiries = () => {
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Enquiries
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>subject</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Seen date</TableCell>
              <TableCell>Responded date</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.date}</TableCell>
                <TableCell>{file.subject}</TableCell>
                <TableCell>
                   {file.name} 
                </TableCell>
                <TableCell>{file.email}</TableCell>
                <TableCell>{file.phoneNumber}</TableCell>
                <TableCell> {file.seenDate} </TableCell>
                <TableCell> {file.respondedDate} </TableCell>
                <TableCell>
                  <Link to="/dashboard/enquiry">View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Enquiries;
