import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Popper,
  Container,
  Alert,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { SideMenu } from "../../publicView/JsonFiles/SideMenu";
import { mainMenu } from "../../publicView/JsonFiles/MainMenu";
import ExcelPreview from "../ExcelPreview";
import Spinner from "../../publicView/Components/Spinner";

const formats = ["PDF"];

const AddMarque = () => {
  const [selectedFormat, setSelectedFormat] = useState("Pdf");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [customFileName, setCustomFileName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    if (file && customFileName && title) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [file, customFileName, title]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = {
      PDF: ["pdf"],
    };

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions[selectedFormat].includes(fileExtension)) {
      setError(
        `Invalid file type. Please select a valid ${selectedFormat} file.`
      );
      setFile(null);
    } else {
      setError("");
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("marquee_title", title);
    formData.append("custom_name", customFileName);

    if (file && customFileName) {
      const token = localStorage.getItem("token");
      console.log('marque title = ', title);
      console.log('marque data = ', formData);
      try {
        const response = await axios.post(
          `https://delightfulbroadband.com/api/marquee`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 201) {
          throw new Error("Failed to upload file");
        }

        toast.success(response?.data?.message, { duration: 1500 });
        handleClear();
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload file", { duration: 1500 });
      }
    } else {
      console.log("Form is incomplete");
    }
    setLoading(false);
  };

  const handleFormatChange = (event) => {
    event.preventDefault();
    setFile(null);
    setTitle("");
    setError("");
    setSelectedFormat(event.target.value);

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = "";
    }
  };

  const handleClear = () => {
    setFile(null);
    setCustomFileName("");
    setTitle("");
    setError("");

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = "";
    }
  };

  return (
    <Container>
      <Spinner loading={loading} />
      <Typography variant="h5">Add Marquee</Typography>
      <Box
        sx={{ width: { lg: "60%", xs: "100%" }, p: 1, bgcolor: "", mt: 5 }}
      >
        <FormControl component="fieldset" sx={{ mb: 2, width: "100%" }}>
          <FormLabel component="legend">Format</FormLabel>
          <RadioGroup row value={selectedFormat} onChange={handleFormatChange}>
            {formats.map((format) => (
              <FormControlLabel
                key={format}
                value={format}
                control={<Radio />}
                label={format}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <TextField
          label="Marquee Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Custom File Name"
          value={customFileName}
          onChange={(event) => setCustomFileName(event.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel>Upload File</FormLabel>
          <input
            type="file"
            name="file"
            accept={selectedFormat === "Excel" ? ".xlsx,.xls,.csv" : ".pdf"}
            onChange={handleFileChange}
          />
        </FormControl>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box>
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
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddMarque;
