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

const AddRecentUpdate = () => {
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedSubheadings, setSelectedSubheadings] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("Pdf");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [customFileName, setCustomFileName] = useState("");
  const [loading, setLoading] = useState(false);




  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = {
      // Excel: ["xlsx", "xls", "csv"],
      PDF: ["pdf"],
    };

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions[selectedFormat].includes(fileExtension)) {
      setError(
        `Invalid file type. Please select a valid ${selectedFormat} file.`
      );
      setFile(null);
      setFileURL(null);
    } else {
      setError("");
      setFile(file);
      setFileURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (file && customFileName) {
      const formData = new FormData();
        let lastTwoSubheadings = 'null/Recent Updates';
      

        // console.log(lastTwoSubheadings);

        formData.append("file", file);
        formData.append("filePath", lastTwoSubheadings);
        formData.append("name", customFileName);



        const token = localStorage.getItem("token");
        try {
          const response = await axios.post(
            `https://delightfulbroadband.com/api/filesUpload/upload/e-files`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              }
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
    setFileURL(null);
    setError("");
    setSelectedFormat(event.target.value);

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = "";
    }
  };

  const handleClear = () => {
    setSelectedHeading(null);
    setSelectedSubheadings({});
    setSelectedFormat("Excel");
    setFile(null);
    setFileURL(null);
    setCustomFileName("");
    setError("");

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = "";
    }
  };

  return (
    <Container>
      <Spinner loading={loading} />
      <Typography variant="h5">Add Recent Updates</Typography>
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
            name='file'
            accept={selectedFormat === "Excel" ? ".xlsx,.xls,.csv" : ".pdf"}
            onChange={handleFileChange}
          />
        </FormControl>

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
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddRecentUpdate;