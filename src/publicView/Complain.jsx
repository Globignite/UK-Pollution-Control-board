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
import Spinner from "./Components/Spinner";
import PrintModal from "./Components/PrintModal";

function Complain() {
  const today = new Date().toISOString().split("T")[0];
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [complaint, setComplaint] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [complaintNumber, setComplaintNumber] = useState(null);
  const fileInputRef = useRef(null);
  const [complaintData, setComplaintData] = useState(null);

  const handleFileChange = (event) => {
    const fileArray = Array.from(event.target.files).map((file) => {
      return {
        url: URL.createObjectURL(file),
        type: file.type,
        file,
      };
    });
    setFiles((prevFiles) => prevFiles.concat(fileArray));
    event.target.value = null; // Clean up the object URL
  };

  const handleRemoveFile = (fileObj) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.url !== fileObj.url));
    URL.revokeObjectURL(fileObj.url);
  };

  const clearFormData = () => {
    setSubject("");
    setName("");
    setEmail("");
    setPhone("");
    setComplaint("");
    setFiles([]);
    fileInputRef.current.value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
    files.forEach((fileObj) => {
      formData.append("files", fileObj.file);
    });
    formData.append("subject", subject);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("complaint", complaint);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_COMPLAIANT_URL}/add-complaints`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setComplaintData(response.data.data)
      alert(`Your Complaint Number is :${response.data.data.complaintId}`);
      clearFormData(); // Clear form data on success
      setLoading(false)
      setOpen(true); // Open success dialog on successful upload
    } catch (error) {
      console.error("Error uploading files: ", error);
      alert("Error uploading files: ", error);
      clearFormData();
    }
    setLoading(false)
  };

  const handleClose = () => {
    setOpen(false);
    setComplaintData(null)
  };

  return (
    <Container component="main" maxWidth="sm">

      <Spinner loading={loading} />


      <Spinner loading={loading} />

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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Subject"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="Phone"
              type="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={10}
              style={{ width: "100%" }}
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
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
          {files.map((fileObj, index) => (
            <Grid item xs={4} key={index}>
              <div style={{ position: "relative" }}>
                <img
                  src={fileObj.url}
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
                  onClick={() => handleRemoveFile(fileObj)}
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
      {/* <Dialog open={open} onClose={handleClose}>
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
      </Dialog> */}
        {
          complaintData &&
          <PrintModal data={complaintData} open={open} title='Complaint' handleClose={handleClose} />
        }

    </Container>
  );
}

export default Complain;
