import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Popper, Container, Alert, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import DashboardNavbar from './DashboardNavbar';

const formats = ['Excel', 'PDF', 'Photo', 'Video'];
const CustomPopper = (props) => {
    return <Popper {...props} style={{ zIndex: 1 }} placement="bottom-start" />;
  };
  
  const MyComponent = () => {
    const [headings, setHeadings] = useState([
        { label: 'Heading 1', subheadings: [] },
        { label: 'Heading 2', subheadings: [] },
        { label: 'Heading 3', subheadings: [] }
      ]);
    
      const [selectedHeading, setSelectedHeading] = useState(null);
      const [selectedSubheadings, setSelectedSubheadings] = useState([]);
      const [selectedFormat, setSelectedFormat] = useState('Excel');
      const [file, setFile] = useState(null);
      const [fileURL, setFileURL] = useState(null);
      const [error, setError] = useState('');
      const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
      const [customHeading, setCustomHeading] = useState('');
    
      useEffect(() => {
        setIsSubmitDisabled(!(selectedHeading || selectedSubheadings.length > 0 || selectedFormat || file));
      }, [selectedHeading, selectedSubheadings, selectedFormat, file]);
    
      const handleHeadingChange = (event, newValue) => {
        setSelectedHeading(newValue);
        setSelectedSubheadings([]);
      };
    
      const handleSubheadingChange = (event, newValue) => {
        setSelectedSubheadings(newValue);
      };
    
      const handleAddSubheading = () => {
        if (selectedHeading) {
          const newSubheadings = [...selectedHeading.subheadings, { label: `Subheading ${selectedHeading.subheadings.length + 1}` }];
          const updatedHeadings = headings.map(heading => heading.label === selectedHeading.label ? { ...heading, subheadings: newSubheadings } : heading);
          setHeadings(updatedHeadings);
        }
      };
    
      const handleAddHeading = () => {
        if (customHeading.trim()) {
          const newHeading = { label: customHeading.trim(), subheadings: [] };
          setHeadings([...headings, newHeading]);
          setSelectedHeading(newHeading);
          setCustomHeading('');
        }
      };
    
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileURL(URL.createObjectURL(selectedFile));
      };
    
      const handleSubmit = () => {
        if (file) {
          const formData = {
            heading: selectedHeading?.label,
            subheadings: selectedSubheadings,
            format: selectedFormat,
            file: file.name,
          };
          console.log(formData);
          console.log('File URL:', fileURL);
        } else {
          console.log('No file selected');
        }
      };
    
      const handleClear = () => {
        setSelectedHeading(null);
        setSelectedSubheadings([]);
        setSelectedFormat('Excel');
        setFile(null);
        setFileURL(null);
      };
  
    return (
        <>
        <DashboardNavbar />
        <Container sx={{ width: { lg: '60%', xs: '100%' }, p: 1, bgcolor: '', mt: 5 }}>
          <Autocomplete
            options={headings}
            value={selectedHeading}
            getOptionLabel={(option) => option.label}
            onChange={handleHeadingChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Heading"
                value={customHeading}
                onChange={(e) => setCustomHeading(e.target.value)}
              />
            )}
            PopperComponent={CustomPopper}
            sx={{ width: '100%', mb: 2 }}
          />
          {!selectedHeading && (
            <Button variant="contained" onClick={handleAddHeading} sx={{ mb: 2 }}>
              Add Heading
            </Button>
          )}
          {selectedHeading && (
            <Autocomplete
              multiple
              options={selectedHeading.subheadings}
              value={selectedSubheadings}
              getOptionLabel={(option) => option.label}
              onChange={handleSubheadingChange}
              renderInput={(params) => <TextField {...params} label="Subheadings" />}
              PopperComponent={CustomPopper}
              sx={{ width: '100%', mb: 2 }}
            />
          )}
          {!selectedHeading && (
            <Button variant="contained" onClick={handleAddSubheading} sx={{ mb: 2 }}>
              Add Subheading
            </Button>
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
          <input type="file" onChange={handleFileChange} style={{ display: 'block', marginBottom: '16px' }} />
          {fileURL && <div><a href={fileURL} target="_blank" rel="noopener noreferrer">Preview File</a></div>}
          <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClear}>Clear</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</Button>
        </Container>
      </>
    );
  };
  
  export default MyComponent;