import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


function ManageMedia() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(0);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Manage Media
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        marginBottom={2}
      >
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
          variant="outlined"
          placeholder="Search"
          style={{ flex: 1 }}
        />

        <TextField
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          label="Start Date"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
        <TextField
          type="date"
          value={endDate}
          margin="normal"
          onChange={(e) => handleDateChange("end", e.target.value)}
          label="End Date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
        <Button variant="contained" style={{ alignSelf: "center" }}>
          Apply Filters
        </Button>
      </Box>

      {/* event medias */}
      <h3>results </h3>

      {/* components  */}
      <div className="ManageMediaContainer">
        <div className="deleteBtn">
        <DeleteIcon />
        </div>
        <h4>EventTitle</h4>
        <p>eventDate</p>
        <p>EventDescripiton</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <p>all photo video will come here</p>
        </div>
      </div>
      <div className="ManageMediaContainer">
        <div className="deleteBtn">
        <DeleteIcon />
        </div>
        <h4>EventTitle</h4>
        <p>eventDate</p>
        <p>EventDescripiton</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <p>all photo video will come here</p>
        </div>
      </div>
    </>
  );
}

export default ManageMedia;
