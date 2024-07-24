import { useState, useEffect, useRef } from "react";
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
  Box,
  Paper,
  TablePagination
} from "@mui/material";
import { styled } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

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

function ViewEnquiry() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [enquiryData, setEnquiryData] = useState({});
  const [statusFilter, setStatusFilter] = useState(); 
  const [note, setNote] = useState();
  const [notesArray,setNotesArray] =useState([]);
  const { enquireId } = useParams();
  const componentRef = useRef();
  console.log(enquiryData);
  useEffect(() => {
    fetchEnquire();
  }, [enquireId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function fetchEnquire() {
    try {
      const response = await axios.get(`https://delightfulbroadband.com/api/enquiries/fetch-single-enquiries/${enquireId}`);
      setEnquiryData(response?.data.data || {});
      setStatusFilter(response?.data.data.status);
      setNotesArray(response?.data.data.
        action_notes);
      console.log(response?.data.data );
    } catch (error) {
      console.error(error);
    }
  }


  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleUpdateChange = (e) => {
    setStatusFilter(e.target.value);
  }
 
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  }


  const handleNoteSubmit = async () => {
    const token = localStorage.getItem('token');
    const currentDate = getCurrentDate();
    try {
      const response = await axios.patch('https://delightfulbroadband.com/api/enquiries/update-enquiries-action-note', {
        _id: enquiryData._id,
        actions: [
          {
            date:currentDate,
            status: statusFilter,
            note: note
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        fetchEnquire()
        console.log(response?.data);
         //APPEND
        alert('Action note added successfully');
        setNote();  // Clear the note field after successful submission
        setStatusFilter();
      }
    } catch (error) {
      console.error('Error adding action note:', error);
      alert('Failed to add action note');
    }
  };

 

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem('token');
    console.log(statusFilter);
    try {
      const response = await axios.patch(
        'https://delightfulbroadband.com/api/enquiries/update-enquiries-status', 
        {
          _id: enquiryData._id,
          status: statusFilter
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        }
      );
      if (response.status === 201) {
        // setNotes(prevNotes => [...prevNotes, newNote]);
        alert('Status updated successfully');
        fetchEnquire();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } 
  };

  
  const pageStyle = `
    @page {
        margin: 10mm;
    }
    @media print {
        body {
            -webkit-print-color-adjust: exact;
        }
        #print_icon {
            display: none !important;
        }
        #content-box {
            max-height: none !important;
        }
        #disableComponentPrint{
            display: none !important;
          }

    }
  `;

  const handlePrint = useReactToPrint({
    documentTitle: `Uttarakhand Pollution Control Board, Government Of Uttarakhand, India`,
    copyStyles: true,
    pageStyle: pageStyle,
    content: () => componentRef.current,
  });

  return (
    <Container>
      <Box
          sx={{
            position: 'relative',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            float: "right",
          }}
        >
      <Box id="disableComponentPrint" sx={{display: "flex",alignItems: "center", justifyContent: "center" }} >
      <FormControl variant="outlined" margin="normal" style={{width:'200px'}} >
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{display: "flex",alignItems: "center"}} >
        <Button
          variant="contained"
          onClick={handleUpdateStatus}
          sx={{ ml: 2 }}
        >
         Update Status
        </Button>
        </Box>
      </Box>
      <Box sx={{mx:10,  cursor: "pointer"}}    onClick={handlePrint} id="print_icon">
      <img
            src="/assets/print.png"
            alt="print"
            style={{ width: "40px", height: "40px" }}
          />
          <Typography variant="body1" color="error.main">
            Print
          </Typography>
      </Box>
      </Box>
      <div ref={componentRef} >
        <Typography variant="h6" gutterBottom mt={3}>
          Enquiry
        </Typography>
        <TableContainer component={Paper} sx={{ width: '75vw' }}>
          <Table sx={{ width: '100%' }}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Date</TableCell>
                <TableCell>{enquiryData.createdAt ? enquiryData.createdAt.split('T')[0] : 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Enquiry Number</TableCell>
                <TableCell>{enquiryData.enquiryId || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Subject</TableCell>
                <TableCell>{enquiryData.subject || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Name</TableCell>
                <TableCell>{enquiryData.name || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Email</TableCell>
                <TableCell>{enquiryData.email || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Phone</TableCell>
                <TableCell>{enquiryData.phone || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Enquiry</TableCell>
                <TableCell>{enquiryData.enquiry || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell component="th" scope="row">In Progress Date</TableCell>
                  <TableCell>{enquiryData.progress_date  ? enquiryData.progress_date.split('T')[0] : 'N/A' }</TableCell>
                </TableRow> 
                <TableRow>
                  <TableCell component="th" scope="row">Resolved Date</TableCell>
                  <TableCell>{enquiryData.resolve_date ? enquiryData.resolve_date.split('T')[0] : 'N/A'}</TableCell>
                </TableRow> 
            </TableBody>
          </Table>
        </TableContainer>
      <Box marginTop={5} marginBottom={5} id="disableComponentPrint" >
        <Typography variant="h6" gutterBottom>
          Notes
        </Typography>
        <Textarea 
        placeholder="Write A Note..." 
        aria-label="minimum height" 
        minRows={3} 
        value={note}
        onChange={handleNoteChange}
        style={{ width: "70%" }}
         />
        <Button variant="contained"  
        onClick={handleNoteSubmit}
         sx={{ width: "20%", mt: 2, ml: 1, display: 'block' }}>
          Submit
        </Button>
      </Box>
      <Box marginTop={5} marginBottom={5}>
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
              {notesArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={notesArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      </div>
    </Container>
  );
}

export default ViewEnquiry;
