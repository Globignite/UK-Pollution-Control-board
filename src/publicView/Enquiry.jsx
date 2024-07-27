import  { useState } from "react";
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
import axios from "axios";
import Spinner from "./Components/Spinner";
import PrintModal from "./Components/PrintModal";

function Enquiry() {
  const today = new Date().toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD
  const [open, setOpen] = useState(false);
  const [enquiryNumber, setEnquiryNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eqData, setEqData] = useState(null);

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
      setEqData(response?.data?.data);
      setEnquiryNumber(response?.data?.data.enquiryId);
      setOpen(true); // Open success dialog on successful upload
      clearFormData(); // Clear form data on success
      setOpen(true); // Open success dialog on successful upload
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

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
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
              inputProps={{
                maxLength: 50,
              }}
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
              inputProps={{
                minLength: 10,
                maxLength: 11,
              }}
              onInput={handlePhoneInput}
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
              inputProps={{
                maxLength: 500,
              }}
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

      {eqData && (
        <PrintModal
          data={eqData}
          open={open}
          title="Enquiry"
          handleClose={handleClose}
        />
      )}
    </Container>
  );
}

export default Enquiry;
