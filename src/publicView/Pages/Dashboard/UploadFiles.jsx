import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Popper, Container, Alert, Typography } from '@mui/material';
import DashboardNavbar from './DashboardNavbar';
import { SideMenu } from '../../JsonFiles/SideMenu';
import { mainMenu } from '../../JsonFiles/MainMenu';
import { toast } from "sonner";
import axios from 'axios';
import { AdminNavbar } from './DashboardNavbar';
import ExcelPreview from './ExcelPreview';
import { Link } from 'react-router-dom';

const formats = ['Excel', 'PDF'];  

const CustomPopper = (props) => {
  return <Popper {...props} style={{ zIndex: 1 }} placement="bottom-start" />;
};

const RecursiveSubheading = ({ subheadings, level, onChange }) => {
  const [selectedSubheading, setSelectedSubheading] = useState(null);

  const handleSubheadingChange = (event, newValue) => {
    setSelectedSubheading(newValue);
    onChange(level, newValue);
  };

  return (
    <>
      <Autocomplete
        options={subheadings}
        getOptionLabel={(option) => option.name}
        value={selectedSubheading}
        onChange={handleSubheadingChange}
        renderInput={(params) => (
          <TextField {...params} label={`Subheading Level ${level}`} fullWidth />
        )}
        PopperComponent={CustomPopper}
        sx={{ width: '100%', mb: 2 }}
      />
      {selectedSubheading?.subItems && (
        <RecursiveSubheading
          subheadings={selectedSubheading.subItems}
          level={level + 1}
          onChange={onChange}
        />
      )}
    </>
  );
};

const MyComponent = () => {
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedSubheadings, setSelectedSubheadings] = useState({});
  const [selectedFormat, setSelectedFormat] = useState('Excel');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [customFileName, setCustomFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [storedFileName, setStoredFileName] = useState(null);
  const [togglePreviewExcel, setTogglePreviewExcel] = useState(false);

  useEffect(() => {
    const hasSubheadings = selectedHeading?.subItems ? Object.keys(selectedSubheadings).length > 0 : true;
    setIsSubmitDisabled(!(selectedHeading && hasSubheadings && selectedFormat && file && customFileName));
  }, [selectedHeading, selectedSubheadings, selectedFormat, file, customFileName]);

  const handleHeadingChange = (event, newValue) => {
    setSelectedHeading(newValue);
    setSelectedSubheadings({});
  };

  const handleSubheadingChange = (level, subheading) => {
    // Update the selected subheading at the current level
    setSelectedSubheadings((prev) => ({
      ...prev,
      [level]: subheading
    }));

    // Remove all higher-level subheadings
    for (let i = level + 1; i <= Object.keys(selectedSubheadings).length; i++) {
      delete selectedSubheadings[i];
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = {
      Excel: ['xlsx', 'xls', 'csv'],
      PDF: ['pdf'],
    };

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validExtensions[selectedFormat].includes(fileExtension)) {
      setError(`Invalid file type. Please select a valid ${selectedFormat} file.`);
      setFile(null);
      setFileURL(null);
    } else {
      setError('');
      setFile(file);
      setFileURL(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_UPLOAD_URL}/upload/e-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        } 
      });
      if(response?.data?.data?.filename !== undefined){
        toast.success("successful!!", { duration: 1500 });
        setStoredFileName(response.data?.filename)
        return response.data?.data?.filename
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (file && selectedHeading && customFileName) {
      const formData = new FormData();
      formData.append('heading', selectedHeading.name);
      formData.append('customFileName', customFileName);
      formData.append('format', selectedFormat);

      const upload_res = await uploadFile(file);
    
      if (upload_res) {
        const lastTwoKeys = Object.keys(selectedSubheadings).slice(-2);
        const lastTwoSubheadings = lastTwoKeys.map(key => selectedSubheadings[key].name).join('/');

        console.log(lastTwoSubheadings)

        const newPDF = {
          name: customFileName,
          href: `/assets/${selectedFormat}/${upload_res}`,
          type: selectedFormat
        };

        try {
          const res = await fetch(`${import.meta.env.VITE_APP_BASE_UPLOAD_URL}/update/pdf-file`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              newPDF, category: lastTwoSubheadings
            }),
          });
    
          if (!res.ok) {
            throw new Error('Failed to upload file');
          }
    
          const data = await res.json();
          toast.success(data?.message, { duration: 1500 });
          handleClear();
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file', { duration: 1500 });
        }
      }
    } else {
      console.log('Form is incomplete');
    }
  };

  const handleFormatChange = (event) => {
    event.preventDefault();
    setFile(null);
    setFileURL(null);
    setError('');
    setSelectedFormat(event.target.value);

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = '';
    }
  };

  const handleClear = () => {
    setSelectedHeading(null);
    setSelectedSubheadings({});
    setSelectedFormat('Excel');
    setFile(null);
    setFileURL(null);
    setCustomFileName('');
    setError('');

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = '';
    }
  };

  const combinedOptions = [...mainMenu.slice(1,-1), ...SideMenu.menu ];

  return (
    <>
      <AdminNavbar />
      <Container sx={{ width: { lg: '60%', xs: '100%' }, p: 1, bgcolor: '', mt: 5 }}>
        <Autocomplete
          options={combinedOptions}
          value={selectedHeading}
          getOptionLabel={(option) => option.name}
          onChange={handleHeadingChange}
          renderInput={(params) => <TextField {...params} fullWidth label="Heading" />}
          PopperComponent={CustomPopper}
          sx={{ width: '100%', mb: 2 }}
        />

        {selectedHeading?.subItems && (
          <RecursiveSubheading
            subheadings={selectedHeading.subItems}
            level={1}
            onChange={handleSubheadingChange}
          />
        )}

        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <FormLabel component="legend">Format</FormLabel>
          <RadioGroup
            row
            value={selectedFormat}
            onChange={handleFormatChange}
          >
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
            name="file"
            onChange={handleFileChange}
            style={{ display: 'block', marginBottom: '16px' }}
          />
        </FormControl>

        {error && <Alert severity="error">{error}</Alert>}
        {fileURL !== null ? 
          selectedFormat !== 'Excel' ?
          <div>
            <a href={fileURL} target="_blank">Preview File</a>
          </div>
          :
          <>
            <Link onClick={() => setTogglePreviewExcel((prev) => !prev)}>
              {togglePreviewExcel ? "Hide Preview" : "Preview File"}
            </Link>
            {
              togglePreviewExcel &&
              <Box sx={{ mt: 3, border: '1px solid grey' }}>
                <ExcelPreview file={file} />
              </Box>
            }
          </>
          : ''
        }

        <Box>
          <Button variant="outlined" sx={{ width: '45%', mt: 2, mr: 1 }} onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" sx={{ width: '45%', mt: 2, ml: 1 }} onClick={handleSubmit} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MyComponent;
