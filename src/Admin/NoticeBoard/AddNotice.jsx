import React, { useState } from 'react';
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
} from '@mui/material';

const AddNotice = () => {
  const [format, setFormat] = useState('Excel');
  const [customFileName, setCustomFileName] = useState('');
  const [file, setFile] = useState(null);

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('Submitting:', { format, customFileName, file });
    // Add your submit logic here
  };

  const handleClear = () => {
    setFormat('Excel');
    setCustomFileName('');
    setFile(null);
    document.getElementById('file-upload').value = '';
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }}>Add Notice</Typography>
       

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Format</FormLabel>
        <RadioGroup
          row
          value={format}
          onChange={handleFormatChange}
        >
          <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
          <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
        </RadioGroup>
      </FormControl>

      <TextField
        fullWidth
        label="Custom File Name"
        value={customFileName}
        onChange={(e) => setCustomFileName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel component="legend">Upload File</FormLabel>
        <input
          id="file-upload"
          type="file"
          accept={format === 'Excel' ? ".xlsx,.xls,.csv" : ".pdf"}
          onChange={handleFileChange}
        />
      </FormControl>

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

export default AddNotice;
