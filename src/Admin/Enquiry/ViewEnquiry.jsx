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

function ViewEnquiry() {

    const data = {
        Date: '13/12/2023',
        enquiryNumber: '345456547567567567',
        Subject: 'My subject',
        Name: 'Suraj',
        Email: 'suraj@gmail.com',
        Phone: '9876543210', 
        Enquiry : "loreEx quis incididunt occaecat nostrud nostrud in excepteur anim. Cillum sunt mollit sit qui occaecat veniam. Labore culpa occaecat consectetur esse commodo aliqua sit deserunt ad voluptate nisi reprehenderit veniam laborum. Amet do eu magna fugiat cillum. Non nisi voluptate ipsum magna qui."
      };


  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Enquiry
      </Typography>
      <TableContainer >
        <Table>
          <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ViewEnquiry;
