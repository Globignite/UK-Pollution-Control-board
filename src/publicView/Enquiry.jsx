import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "./Components/Spinner";

function Enquiry() {
  const today = new Date().toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD
  const [open, setOpen] = useState(false);
  const [enquiryNumber, setEnquiryNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const enquiryData = {
      date: formData.get("date"),
      subject: formData.get("subject"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      enquiry: formData.get("enquiry"),
    };
    await sendRequest(enquiryData);
    setLoading(false);
  };

  const sendRequest = async (enquiryData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_ENQUIRIES_URL}/add-enquiries`,
        enquiryData
      );
      console.log(response.data);
      setEnquiryNumber(response?.data?.data.enquiryId);
      setOpen(true); // Open success dialog on successful upload
      clearFormData(); // Clear form data on success
      // setOpen(true); // Open success dialog on successful upload
    } catch (error) {
      console.error("Error submitting enquiry: ", error);
      clearFormData();
    }
  };

  const clearFormData = () => {
    document.getElementById("enquiry-form").reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm">

      <Spinner loading={loading} />

      <Typography variant="h4">Enquiry</Typography>
      <form id="enquiry-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Hidden date field */}
          <Grid item xs={12}>
            <input type="hidden" id="date" name="date" value={today} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={10}
              style={{ width: "100%" }}
              id="enquiry"
              name="enquiry"
              aria-label="enquiry"
              placeholder="Enquiry"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Submission Successful!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Your complaint number is: ${enquiryNumber}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Enquiry;
