import React, { useState, useRef } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function Complain() {
  const today = new Date().toISOString().split("T")[0];
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [complaintNumber, setComplaintNumber] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const fileArray = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prevFiles) => prevFiles.concat(fileArray));
    // clean up the object url
    event.target.value = null;
  };

  const handleRemoveFile = (fileUrl) => {
    setFiles((prevFiles) => prevFiles.filter((url) => url !== fileUrl));
    URL.revokeObjectURL(fileUrl);
  };

  const clearFormData = () => {
    setSubject("");
    setName("");
    setEmail("");
    setPhone("");
    setComplain("");
    setFiles([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Append files to formData
    Array.from(fileInputRef.current.files).forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const response = await axios.post(
        "https://delightfulbroadband.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // setComplaintNumber(response.data.complaintNumber); // Assume the response has a complaintNumber
      setComplaintNumber(123434);
      clearFormData(); // Clear form data on success
      setOpen(true); // Open success dialog on successful upload
    } catch (error) {
      console.error("Error uploading files: ", error);
      clearFormData();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4">Complain</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              id="complain"
              name="complain"
              aria-label="complain"
              placeholder="Write your complain"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Images
            </Button>
          </Grid>
          {files.map((file, index) => (
            <Grid item xs={4} key={index}>
              <div style={{ position: "relative" }}>
                <img
                  src={file}
                  alt="Preview"
                  style={{ width: "100%", height: "auto" }}
                />
                <Button
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#0e3c66",
                    color: "white",
                    padding: "0px",
                    width: "50px",
                  }}
                  onClick={() => handleRemoveFile(file)}
                >
                  <CloseIcon style={{ width: "20px", margin: "0px" }} />
                </Button>
              </div>
            </Grid>
          ))}
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
            {`Your complaint number is: ${complaintNumber}`}
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

export default Complain;
