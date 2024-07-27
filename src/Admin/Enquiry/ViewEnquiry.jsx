import { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [enquiryData, setEnquiryData] = useState({});
  const [statusFilter, setStatusFilter] = useState();
  const [note, setNote] = useState();
  const [notesArray, setNotesArray] = useState([]);
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
      const response = await axios.get(
        `https://delightfulbroadband.com/api/enquiries/fetch-single-enquiries/${enquireId}`
      );
      setEnquiryData(response?.data.data || {});
      setStatusFilter(response?.data.data.status);
      setNotesArray(response?.data.data.action_notes);
      console.log(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleUpdateChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleNoteSubmit = async () => {
    const token = localStorage.getItem("token");
    const currentDate = getCurrentDate();
    try {
      const response = await axios.patch(
        "https://delightfulbroadband.com/api/enquiries/update-enquiries-action-note",
        {
          _id: enquiryData?._id,
          actions: [
            {
              date: currentDate,
              status: statusFilter,
              note: note,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchEnquire();
        console.log(response?.data);
        //APPEND
        alert("Action note added successfully");
        setNote(); // Clear the note field after successful submission
        setStatusFilter();
      }
    } catch (error) {
      console.error("Error adding action note:", error);
      alert("Failed to add action note");
    }
  };

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem("token");
    console.log(statusFilter);
    try {
      const response = await axios.patch(
        "https://delightfulbroadband.com/api/enquiries/update-enquiries-status",
        {
          _id: enquiryData?._id,
          status: statusFilter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        // setNotes(prevNotes => [...prevNotes, newNote]);
        alert("Status updated successfully");
        fetchEnquire();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
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

  console.log(enquiryData);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          gap: 5,
          mb: 3,
        }}
      >
        <Box
          id="disableComponentPrint"
          sx={{
            display: enquiryData?.status === "resolved" ? "none" : "flex",
            alignItems: "center",
          }}
        >
          <FormControl
            variant="outlined"
            margin="normal"
            sx={{ width: "200px" }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="new" disabled={true}>
                New
              </MenuItem>
              <MenuItem
                value="in_progress"
                disabled={
                  enquiryData?.status === "in_progress" ||
                  enquiryData?.status === "resolved"
                }
              >
                In Progress
              </MenuItem>
              <MenuItem
                value="resolved"
                disabled={
                  enquiryData?.status === "new" ||
                  enquiryData?.status === "resolved"
                }
              >
                Resolved
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleUpdateStatus}
            sx={{ ml: 2 }}
          >
            Update Status
          </Button>
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={handlePrint} id="print_icon">
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
      <div ref={componentRef}>
        <Typography variant="h6" gutterBottom mt={3}>
          Enquiry
        </Typography>
        <Paper sx={{ padding: 4, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Enquiry Number
              </Typography>
              <Typography>{enquiryData?.enquiryId || "N/A"}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Status
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {enquiryData?.status || "N/A"}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Date
              </Typography>
              <Typography>
                {enquiryData?.createdAt
                  ? enquiryData?.createdAt.split("T")[0]
                  : "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                In Progress Date
              </Typography>
              <Typography>
                {enquiryData?.progress_date
                  ? enquiryData?.progress_date.split("T")[0]
                  : "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Resolved Date
              </Typography>
              <Typography>
                {enquiryData?.resolve_date
                  ? enquiryData?.resolve_date.split("T")[0]
                  : "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Name
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {enquiryData?.name || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Email
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {enquiryData?.email || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Phone
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {enquiryData?.phone || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Subject
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {enquiryData?.subject || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Enquiry
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {enquiryData?.enquiry || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Box marginTop={5} marginBottom={5} id="disableComponentPrint">
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
          <Button
            variant="contained"
            onClick={handleNoteSubmit}
            sx={{ width: "20%", mt: 2, ml: 1, display: "block" }}
          >
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
                {notesArray
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.note}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10]}
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
