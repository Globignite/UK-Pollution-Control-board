import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import GetMenu from "../Components/GetMenu";
import ImageContainer from "../Components/ImageContainer";

const AddMedia = () => {
  const [format, setFormat] = useState("Excel");
  const [eventName, setEventName] = useState("");
  const [file, setFile] = useState(null);

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log("Submitting:", { format, eventName, file });
    // Add your submit logic here
  };

  const handleClear = () => {
    setFormat("Excel");
    setEventName("");
    setFile(null);
    document.getElementById("file-upload").value = "";
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
    width: 320px;
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Upload Photos and Videos
      </Typography> 

      <TextField
        fullWidth
        label="Event Name"
        value={eventName}
        sx={{ mb: 2 }}
      />

      <Typography variant="body1" sx={{ mb: 2 }}>
        Event Description
      </Typography>
      <Textarea aria-label="minimum height" minRows={3} />

      <FormControl fullWidth sx={{ my: 3 }}>
        <FormLabel component="legend">Upload </FormLabel>
        <input
          id="file-upload"
          type="file"
          accept={
            ".png,.jpeg,.jpg,.gif,.bmp,.tiff,.svg,.webp,.mp4,.avi,.mov,.wmv,.flv,.mkv"
          }
          onChange={handleFileChange}
        />
      </FormControl>

      <ImageContainer imageUrl={"/assets/Gallery_3.png"} />

      <Button
        variant="outlined"
        sx={{ width: "45%", mt: 2, mr: 1 }}
        onClick={handleClear}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        sx={{ width: "45%", mt: 2, ml: 1 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default AddMedia;
