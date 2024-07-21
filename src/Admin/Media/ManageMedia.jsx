// import {
//   Container,
//   Box,
//   Button,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import React, { useState, useEffect } from "react";
// import axios from "axios";



// function ManageMedia() {
//   const [media, setMedia] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//     const fetchMedia = async (startDate, endDate, page = 1, limit = 10) => {
//       try {
//         const response = await axios.get('https://delightfulbroadband.com/api/media/fetch-media', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           params: {
//             startDate,
//             endDate,
//             page,
//             limit,
//           },
//         });
    
//         const { data, pagination } = response.data;
//         console.log('Media Data:', response?.data.data);
//         setMedia(response?.data.data);
//         console.log('Pagination Info:', pagination);
//       } catch (error) {
//         console.error('Error fetching media:', error.response ? error.response.data : error.message);
//         throw error;
//       }
//     };

//   const handleDateChange = (type, value) => {
//     if (type === "start") {
//       setStartDate(value);
//     } else {
//       setEndDate(value);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchClick = () => {
//     fetchMedia(startDate, endDate);
//   };




//   return (
//     <Container>
//       <Typography variant="h6" gutterBottom>
//         Manage Media
//       </Typography>
//       <Box
//         display="flex"
//         flexDirection="row"
//         flexWrap="wrap"
//         gap={2}
//         marginBottom={2}
//       >
//         <TextField
//           value={searchTerm}
//           onChange={handleSearchChange}
//           margin="normal"
//           variant="outlined"
//           placeholder="Search Event Name"
//           style={{ flex: 1 }}
//         />

//         <TextField
//           type="date"
//           value={startDate}
//           onChange={(e) => handleDateChange("start", e.target.value)}
//           label="Start Date"
//           margin="normal"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           style={{ flex: 1 }}
//         />
//         <TextField
//           type="date"
//           value={endDate}
//           margin="normal"
//           onChange={(e) => handleDateChange("end", e.target.value)}
//           label="End Date"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           style={{ flex: 1 }}
//         />
//         <Button variant="contained" style={{ alignSelf: "center" }}  onClick={handleSearchClick}>
//           Search
//         </Button>
//       </Box>
//      {/* { media.length===0?(<Typography variant="h6" gutterBottom>
//        No Media Event Record
//       </Typography>):(
//         <Box>
//           <Typography variant="h6" gutterBottom>
//         Media Events
//       </Typography> */}
//       {media.map((item) => (
//             <Box key={item.id} marginBottom={2} padding={2} boxShadow={2} borderRadius={2}>
//               <Typography variant="h6"  marginBottom={2} >{item.name}</Typography>
//               <Typography variant="body1"  sx={{fontWeight:'semibold'}} >{item.description}</Typography>
//               <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {item?.data.length > 0 ?
        
//         item?.data.map((ele, index) => (
//           <Grid item xs={2} sm={4} md={4}
//             key={ele?._id}
//             sx={{
//               position: "relative",
//               width: 600,
//               height: 200,
//               border: "1px solid #ccc",
//               borderRadius: 1,
//               overflow: "hidden",
//             }}
//           >
//             <img
//               src={`https://delightfulbroadband.com${ele.href}`}
//               alt={`Media Event ${index + 1}`}
//               loading="lazy"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//             <IconButton
//               aria-label="delete"
//               size="small"
//               sx={{
//                 position: "absolute",
//                 top: 2,
//                 right: 2,
//                 backgroundColor: "rgba(255, 255, 255, 0.7)",
//               }}
//               // onClick={() => deleteBanner(ele._id)}
//             >
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </Grid>
//         ))
//           : 
//           <p>No data</p>
//       }
//         </Grid>
//       </Box>
//               <Typography variant="body4"  sx={{fontWeight:'semibold'}}>{new Date(item.createdAt).toLocaleDateString()}</Typography>
//             </Box>
//       ))}     
//       {/* </Box> 
//     )} */}
//     </Container>
//   );
// }

// export default ManageMedia;


import {
  Container,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import axios from "axios";

function ManageMedia() {
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchMedia = async (startDate, endDate,searchTerm, page = 1, limit = 10) => {
    try {
      const response = await axios.get('https://delightfulbroadband.com/api/media/fetch-media', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          event_name:searchTerm,
          startDate,
          endDate,
          page,
          limit,
        },
      });

      const { data, pagination } = response.data;
      console.log('Media Data:', response?.data.data);
      setMedia(response?.data.data);
      console.log('Pagination Info:', pagination);
    } catch (error) {
      console.error('Error fetching media:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    fetchMedia(startDate, endDate,searchTerm);
  };
  
  const deleteMediaImage = async (id,link) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete("https://delightfulbroadband.com/api/media/delete-media-file", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          _id: id,
          href:link
        }
      });
      console.log("Success:", response);
      fetchMedia(startDate, endDate);
    } catch (error) {
      console.error("Error deleting Event Media:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
  }

  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete("https://delightfulbroadband.com/api/media/delete-media-event", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          _id: id,
        }
      });
      console.log("Success:", response);
      fetchMedia(startDate, endDate);
    } catch (error) {
      console.error("Error deleting Event:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
  }

  return (
    <Container>
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
          placeholder="Search Event Name"
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
        <Button variant="contained" style={{ alignSelf: "center" }} onClick={handleSearchClick}>
          Search
        </Button>
      </Box>
      {media.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No Media Event Record
        </Typography>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Media Events
          </Typography>
          {media.map((item) => (
            <Box key={item.id} marginBottom={2} padding={2} boxShadow={2} borderRadius={2} sx={{ position: "relative"}}>
              
              <Typography variant="h6" marginBottom={2}>{item.name}</Typography>
              <Typography variant="body1" marginBottom={2} sx={{ fontWeight: 'semibold'}}>{item.description}</Typography>
             
                <Grid container  columns={{ xs: 4, sm: 8, md: 12 }}>
                  {item?.data.length > 0 ? item?.data.map((ele, index) => (
                    <Grid item xs={2} sm={2} md={2}
                      key={ele?._id}
                      
                      marginRight={2}
                      sx={{ position: "relative"}}
                    >
                      <Box>
                      <img
                        src={`https://delightfulbroadband.com${ele.href}`}
                        alt={`Media Event ${index + 1}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover"
                        }}
                      />
                      </Box>
                    </Grid>
                  )) : (
                    <Typography variant="body2">No data</Typography>
                  )}
                </Grid>
           
              <Typography variant="body2" sx={{ fontWeight: 'semibold' }}>{new Date(item.createdAt).toLocaleDateString()}</Typography>
              <IconButton
                 aria-label="delete"
                 size="small"
                sx={{
                 position: "absolute",
                 top: 2,
                 right: 3,
                 backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                      onClick={() => deleteEvent(item._id)}
                >
                  <DeleteIcon fontSize="small" />
                 </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default ManageMedia;
