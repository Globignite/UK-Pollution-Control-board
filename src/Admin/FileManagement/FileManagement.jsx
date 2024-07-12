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
  { name: "Quality Standards - Industry...", date: "03/12/2023" },
  { name: "User Manual - For industries & Unit...", date: "03/12/2023" },
  { name: "Chakra Soft UI Version", date: "03/12/2023" },
  { name: "Chakra Soft UI Version", date: "03/12/2023" },
  { name: "Chakra Soft UI Version", date: "03/12/2023" },
  { name: "Chakra Soft UI Version", date: "03/12/2023" },
];

const FileManagement = () => {
  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Manage Files
      </Typography>
      {/* component for getting menu and sub menu  */}
      <GetMenu  />
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
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href="#" >
                    {file.name}
                  </Link>
                </TableCell>
                <TableCell>{file.date}</TableCell>
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
    </Box>
  );
};

export default FileManagement;
