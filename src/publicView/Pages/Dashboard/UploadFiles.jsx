import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Popper, Container, Alert } from '@mui/material';
import DashboardNavbar from './DashboardNavbar';
import { SideMenu } from '../../JsonFiles/SideMenu';
import { toast } from "sonner";
import axios from 'axios';
import { AdminNavbar } from './DashboardNavbar';

const formats = ['Excel', 'PDF', 'Photo', 'Video'];  

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

  useEffect(() => {
    const hasSubheadings = selectedHeading?.subItems ? Object.keys(selectedSubheadings).length > 0 : true;
    setIsSubmitDisabled(!(selectedHeading && hasSubheadings && selectedFormat && file && customFileName));
  }, [selectedHeading, selectedSubheadings, selectedFormat, file, customFileName]);

  const handleHeadingChange = (event, newValue) => {
    setSelectedHeading(newValue);
    setSelectedSubheadings({});
  };

  // const handleSubheadingChange = (level, subheading) => {
  //   setSelectedSubheadings((prev) => ({
  //     ...prev,
  //     [level]: subheading
  //   }));
  // };

  const handleSubheadingChange = (level, subheading) => {
   // Update the selected subheading at the current level
   setSelectedSubheadings((prev) => ({
    // ...prev,
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
      Photo: ['jpg', 'jpeg', 'png'],
      Video: ['mp4', 'avi', 'mov']
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
      console.log(response.data); // Handle success response
      toast.success("successful!!", { duration: 1500 });
      setStoredFileName(response.data?.filename)
      return response.data?.filename
    } catch (error) {
      console.error(error); // Handle error
      return false
    }
  };

  const handleSubmit = async () => {
    if (file && selectedHeading && customFileName) {
      const formData = new FormData();
      formData.append('heading', selectedHeading.name);
      formData.append('customFileName', customFileName);
      formData.append('format', selectedFormat);
      // formData.append('file', file);




      const upload_res = uploadFile(file)
    
      if(upload_res){

        // const lastKey = Object.keys(selectedSubheadings)[Object.keys(selectedSubheadings).length - 1];
        // const lastSubheading = selectedSubheadings[lastKey];
        // const category = lastSubheading ? lastSubheading.name : selectedHeading.name;

        const lastKey = Object.keys(selectedSubheadings)[Object.keys(selectedSubheadings).length - 1];
        let lastElement = selectedSubheadings[lastKey];

        let newPDF = {
          name: customFileName,
          href: `/assets/${upload_res}`,
        }
        // console.log(category)
        // console.log("checking => ", PDFjson()[category])
        //   // const newData = [...PDFjson(), newPDF]; // Example: Add a new item
        //   PDFjson()[category].push(newPDF)
        //   updatePDFjson(PDFjson()); // Call the update function
        //   console.log(PDFjson()[category])

        console.log(selectedHeading, selectedSubheadings, lastElement.name);

        try {
          const res = await fetch(`${import.meta.env.VITE_APP_BASE_UPLOAD_URL}/update/pdf-file`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              newPDF, category: lastElement.name
            }),
          });
    
          if (!res.ok) {
            throw new Error('Failed to upload file');
          }
    
          const data = await res.json();
          toast.success(data?.message, { duration: 1500 });
          handleClear()
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file', { duration: 1500 });
        }
      
      }
  

    } else {
      console.log('Form is incomplete');
    }
  };

  const handleClear = () => {
    setSelectedHeading(null);
    setSelectedSubheadings({});
    setSelectedFormat('Excel');
    setFile(null);
    setFileURL(null);
    setCustomFileName('');

      // Clear the input file field value
  const inputFileField = document.querySelector('input[type="file"]');
  if (inputFileField) {
    inputFileField.value = '';
  }
  };

  return (
    <>
      {/* <DashboardNavbar /> */}
      <AdminNavbar />
      <Container sx={{ width: { lg: '60%', xs: '100%' }, p: 1, bgcolor: '', mt: 5 }}>
        <Autocomplete
          options={SideMenu.menu}
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
            onChange={(event) => setSelectedFormat(event.target.value)}
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
        {fileURL && <div><a href={fileURL} target="_blank" rel="noopener noreferrer">Preview File</a></div>}

        <Button variant="outlined" sx={{ width: '45%', mt: 2, mr: 1 }} onClick={handleClear}>
          Clear
        </Button>
        <Button variant="contained" sx={{ width: '45%', mt: 2, ml: 1 }} onClick={handleSubmit} disabled={isSubmitDisabled}>
          Submit
        </Button>
      </Container>
    </>
  );
};

export default MyComponent;
