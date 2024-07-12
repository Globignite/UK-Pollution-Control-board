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
  Link,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GetMenu from "../Components/GetMenu";

const files = [
  { name: "Quality Standards - Industry...",type:"pdf", date: "03/12/2023" },
  { name: "User Manual - For industries & Unit...",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
];

const ManageNotice = () => {
  return (
    <Container >
      <Typography variant="h6" gutterBottom>
        Manage Notices
      </Typography>
      {/* component for getting menu and sub menu  */}
      <GetMenu /> 
      <TableContainer component={Paper} style={{width:'60vw'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Files</TableCell>
              <TableCell>Uploaded</TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href="#">{file.name}</Link>
                </TableCell>
                <TableCell>{file.date}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageNotice;
