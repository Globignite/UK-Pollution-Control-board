// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   Typography,
// } from "@mui/material";
// import axios from "axios";

// const AddNotice = () => {
//   const [format, setFormat] = useState("Excel");
//   const [customFileName, setCustomFileName] = useState("");
//   const [file, setFile] = useState(null);
//   const [publishdate,setPublishDate] =useState("");
//   const [module,setModule] = useState("");

//   const handleFormatChange = (event) => {
//     setFormat(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async() => {
//     // const { Module, title, Publish_Date, names } = req.body;
//     console.log("Submitting:", { format, customFileName, file,publishdate,module });
//     // Add your submit logic here
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post("https://delightfulbroadband.com/api/notifications/upload/e-files", 
//         {
//           Module:module, 
//           title:"hdhgfdkjdghjgdh",
//           Publish_Date:publishdate, 
//           names: customFileName,
//           files:file
//         }, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Authorization": `Bearer ${token}`, 
//         },
//       });
//       console.log(response.data);
//       alert("File uploaded successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Error uploading file");
//     }
//   };
 

//   const handleClear = () => {
//     setFormat("Excel");
//     setCustomFileName("");
//     setFile(null);
//     document.getElementById("file-upload").value = "";
//   };
 

//   const today = new Date().toISOString().split("T")[0];
//   return (
//     <Container>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Add Notice
//       </Typography>

//       <FormControl component="fieldset" sx={{ mb: 2 }}>
//         {/* <FormLabel component="legend">Format</FormLabel> */}
//         <RadioGroup row value={format} onChange={handleFormatChange}>
//           <FormControlLabel
//             value="PDF"
//             defaultChecked
//             control={<Radio />}
//             label="PDF"
//           />
//         </RadioGroup>
//       </FormControl>

//       <TextField
//         fullWidth
//         label="Custom File Name"
//         value={customFileName}
//         onChange={(e) => setCustomFileName(e.target.value)}
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         fullWidth
//         label="Module Name"
//         value={module}
//         onChange={(e) => setModule(e.target.value)}
//         sx={{ mb: 2 }}
//       />
//         <TextField
//           type="date"
//           value={publishdate}
//           onChange={(e) => setPublishDate(e.target.value)}
//           label="Publish Date"
//           margin="normal"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           inputProps={{
//             min: today, 
//           }}
//           style={{ flex: 1 }}
//           sx={{ mb: 3 }}
//         />
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <FormLabel component="legend" sx={{ mb: 1, mt:1 }}>Upload File</FormLabel>
//         <input
//           id="file-upload"
//           type="file"
//           name="files"
//           multiple
//           accept={format === "Excel" ? ".xlsx,.xls,.csv" : ".pdf"}
//           onChange={handleFileChange}
//         />
//       </FormControl>

//       <Button
//         variant="outlined"
//         sx={{ width: "45%", mt: 2, mr: 1 }}
//         onClick={handleClear}
//       >
//         Clear
//       </Button>
//       <Button
//         variant="contained"
//         sx={{ width: "45%", mt: 2, ml: 1 }}
//         onClick={handleSubmit}
//       >
//         Submit
//       </Button>
//     </Container>
//   );
// };

// export default AddNotice;


import React, { useState } from "react";
import axios from "axios";
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

const AddNotice = () => {
  const [format, setFormat] = useState("PDF");
  const [customFileName, setCustomFileName] = useState([]);
  const [files, setFiles] = useState([]);
  const [publishDate, setPublishDate] = useState("");
  const [module, setModule] = useState("");
  const [title,settitle] = useState("");

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleCustomFileNameChange = (index, value) => {
    const newCustomFileName = [...customFileName];
    newCustomFileName[index] = value;
    setCustomFileName(newCustomFileName);
  };

  const handleSubmit = async () => {
    if (!files.length) {
      alert("Please upload at least one file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append("files", file);
    });
    formData.append("Module", module);
    formData.append("title", title);
    formData.append("Publish_Date", publishDate);
    customFileName.forEach((name) => formData.append("names", name));

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("https://delightfulbroadband.com/api/notifications/upload/e-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("File uploaded successfully");
      handleClear();
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    }
  };

  const handleClear = () => {
    setFormat("PDF");
    settitle("")
    setCustomFileName([]);
    setFiles([]);
    setPublishDate("");
    setModule("");
    document.getElementById("file-upload").value = "";
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Notice
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <RadioGroup row value={format} onChange={handleFormatChange}>
          <FormControlLabel
            value="PDF"
            control={<Radio />}
            label="PDF"
          />
          <FormControlLabel
            value="Excel"
            control={<Radio />}
            label="Excel"
          />
        </RadioGroup>
      </FormControl>

      {files.map((_, index) => (
        <TextField
          key={index}
          fullWidth
          label={`Custom File Name`}
          value={customFileName[index] || ""}
          onChange={(e) => handleCustomFileNameChange(index, e.target.value)}
          sx={{ mb: 2 }}
        />
      ))}
      <TextField
        fullWidth
        label="Module Name"
        value={module}
        onChange={(e) => setModule(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        type="date"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
        label="Publish Date"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: today,
        }}
        sx={{ mb: 3 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel component="legend" sx={{ mb: 1, mt: 1 }}>Upload Files</FormLabel>
        <input
          id="file-upload"
          type="file"
          name="files"
          multiple
          accept={format === "Excel" ? ".xlsx,.xls,.csv" : ".pdf"}
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