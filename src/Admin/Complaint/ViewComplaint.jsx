import { useState} from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableHead,
  Button,
  TableRow,
  IconButton,
  TablePagination,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

function ViewComplaint() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

    const data = {
        Date: '13/12/2023',
        complaintNumber: '345456547567567567',
        Subject: 'My subject',
        Name: 'Suraj',
        Email: 'suraj@gmail.com',
        Phone: '9876543210', 
        Complaint : "loreEx quis incididunt occaecat nostrud nostrud in excepteur anim. Cillum sunt mollit sit qui occaecat veniam. Labore culpa occaecat consectetur esse commodo aliqua sit deserunt ad voluptate nisi reprehenderit veniam laborum. Amet do eu magna fugiat cillum. Non nisi voluptate ipsum magna qui.",
        Image: "https://images.unsplash.com/photo-1604699229817-27301bdfed68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      };

      const table_data = [
        {
          date: "2023-07-01",
          Note: "loreEx quis incididunt occaecat nostrud nostrud in excepteur anim. Cillum sunt mollit sit qui occaecat veniam. Labore culpa occaecat consectetur esse commodo aliqua sit deserunt ad voluptate nisi reprehenderit veniam laborum. Amet do eu magna fugiat cillum. Non nisi voluptate ipsum magna qui."
        },
        {
          date: "2023-06-25",
          Note: "loreEx quis incididunt occaecat nostrud nostrud in excepteur anim. Cillum sunt mollit sit qui occaecat veniam. Labore culpa occaecat consectetur esse commodo aliqua sit deserunt ad voluptate nisi reprehenderit veniam laborum. Amet do eu magna fugiat cillum. Non nisi voluptate ipsum magna qui."
        },
        {
          date: "2023-06-20",
          Note: "loreEx quis incididunt occaecat nostrud nostrud in excepteur anim. Cillum sunt mollit sit qui occaecat veniam. Labore culpa occaecat consectetur esse commodo aliqua sit deserunt ad voluptate nisi reprehenderit veniam laborum. Amet do eu magna fugiat cillum. Non nisi voluptate ipsum magna qui."
        },
      ];
    
    
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const blue = {
        100: "#DAECFF",
        200: "#b6daff",
        400: "#3399FF",
        500: "#007FFF",
        600: "#0072E5",
        900: "#003A75",
      };
    
      const grey = {
        50: "#F3F6F9",
        100: "#E5EAF2",
        200: "#DAE2ED",
        300: "#C7D0DD",
        400: "#B0B8C4",
        500: "#9DA8B7",
        600: "#6B7A90",
        700: "#434D5B",
        800: "#303740",
        900: "#1C2025",
      };
    
      const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 400px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[600] : blue[200]
          };
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
      );

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Complaint
      </Typography>
      <TableContainer >
        <Table>
          <TableBody>
          {Object.entries(data).map(([key, value]) => (
            key=='Image'?(<> <TableCell component="th" scope="row">{key}</TableCell><TableCell><img src={value} key={key} alt={key} width={300} height={"auto"}/></TableCell></>):(<TableRow key={key}>
              <TableCell component="th" scope="row">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>)
            
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <Box marginTop={5}  marginBottom={5}>
      <FormControl variant="outlined" margin="normal" style={{width:'200px'}} >
          <InputLabel>Status</InputLabel>
          <Select
            // value={statusFilter}
            // onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box marginTop={5}  marginBottom={5}>
      <Typography variant="h6" gutterBottom>
      Notes
      </Typography>
      <Textarea placeholder="Write Note..." aria-label="minimum height" minRows={3}  
      style={{ width: "70%" }}
      />
      <Button
        variant="contained"
        sx={{ width: "20%", mt: 2, ml: 1, display:'block' }}
      >Submit</Button>
      </Box>
      <Box marginTop={5}  marginBottom={5}>
      <Typography variant="h6" gutterBottom>
        Actions
      </Typography>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table_data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.Note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={table_data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </Box>
    </Container>
  );
}

export default ViewComplaint;