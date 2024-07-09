import React from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function Enquiry() {
  const today = new Date().toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      date: formData.get("date"),
      subject: formData.get("subject"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      enquiry: formData.get("enquiry"),
    });
    // Add form submission logic here
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4">Enquiry</Typography>
      <form onSubmit={handleSubmit}>
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
    </Container>
  );
}

export default Enquiry;
