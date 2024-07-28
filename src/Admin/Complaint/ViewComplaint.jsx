import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, } from "@mui/material";
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

function ViewComplaint() {
  const { complaintId } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [note, setNote] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [complaint, setComplaintData] = useState({});
  const [notesArray, setNotesArray] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    fetchComplaintData();
  }, [complaintId]);

  async function fetchComplaintData() {
    try {
      const response = await axios.get(
        `https://delightfulbroadband.com/api/complaints/fetch-single-complaint/${complaintId}`
      );

      const complaintData = response?.data?.data;
      setComplaintData(complaintData);
      setStatusFilter(complaintData.status);
      setNotesArray(complaintData.action_notes);

      if (complaintData?.seen_date === null) {
        const token = localStorage.getItem("token");

        try {
          const res = await axios.patch(
            "https://delightfulbroadband.com/api/complaints/update-complaints-seen",
            {
              _id: complaintData._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.status === 200) {
            alert("Seen date updated successfully");
          }
        } catch (error) {
          console.error("Error updating seen date:", error);
          alert("Failed to update seen date");
        }
      }
    } catch (error) {
      alert("Failed to update seen date");
      console.error("Error fetching complaint:", error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNotesChange = (e) => {
    setNote(e.target.value);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleNoteSubmit = async () => {
    const token = localStorage.getItem("token");
    const currentDate = getCurrentDate();
    try {
      const response = await axios.patch(
        "https://delightfulbroadband.com/api/complaints/update-complaints-action-note",
        {
          _id: complaint?._id,
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
        fetchComplaintData();
        alert("Action note added successfully");
        setNote(""); // Clear the note field after successful submission
        setStatusFilter("");
      }
    } catch (error) {
      console.error("Error adding action note:", error);
      alert("Failed to add action note");
    }
  };

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        "https://delightfulbroadband.com/api/complaints/update-complaints-status",
        {
          _id: complaint?._id,
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
        alert("Status updated successfully");
        fetchComplaintData();
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

  // model to open image  =======================
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Add this function to handle image click
  const handleImageClick = (url) => {
    setSelectedImage(url);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage("");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 5,
          mb: 3,
        }}
      >
        <Box
          id="disableComponentPrint"
          sx={{
            display: complaint?.status === "resolved" ? "none" : "flex",
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
                  complaint?.status === "in_progress" ||
                  complaint?.status === "resolved"
                }
              >
                In Progress
              </MenuItem>
              <MenuItem
                value="resolved"
                disabled={
                  complaint?.status === "new" ||
                  complaint?.status === "resolved"
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
        <Typography variant="h6" gutterBottom>
          Complaint Details
        </Typography>
        <Paper sx={{ padding: 4, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Complaint Number
              </Typography>
              <Typography>{complaint?.complaintId || "N/A"}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Status
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {complaint?.status || "N/A"}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Date
              </Typography>
              <Typography>
                {complaint?.createdAt
                  ? complaint?.createdAt.split("T")[0]
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
                {complaint?.progress_date
                  ? complaint?.progress_date.split("T")[0]
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
                {complaint?.resolve_date
                  ? complaint?.resolve_date.split("T")[0]
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
                {complaint?.name || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Email
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {complaint?.email || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Phone
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {complaint?.phone || "N/A"}
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
                {complaint?.subject || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ color: "gray", marginTop: "10px" }}
                component="div"
              >
                Complaint
              </Typography>
              <Typography sx={{ overflowWrap: "break-word" }}>
                {complaint?.complaint || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" component="div">
                Complaint Image
              </Typography>
              {complaint?.files?.length === 0 ? (
                <Typography>N/A</Typography>
              ) : (
                <Box>
                  {complaint?.files?.map((file, index) => (
                    <img
                      key={index}
                      src={`https://delightfulbroadband.com${file.href}`}
                      width={200}
                      height={100}
                      alt={`Complaint Image ${index + 1}`}
                      style={{ margin: "5px", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(
                          `https://delightfulbroadband.com${file.href}`
                        )
                      }
                    />
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Box marginTop={5} marginBottom={5} id="disableComponentPrint">
          <Typography variant="body2" gutterBottom>
            Notes
          </Typography>
          <Textarea
            aria-label="minimum height"
            minRows={3}
            placeholder="Add Note for Action Took"
            value={note}
            onChange={handleNotesChange}
            style={{ width: "60%" }}
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
          <Typography variant="body2" gutterBottom>
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

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Enlarged Complaint Image"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ViewComplaint;
