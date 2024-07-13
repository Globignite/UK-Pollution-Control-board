import {Grid, Typography, Box,Stack,Button, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import React from "react";
import { Link } from "react-router-dom";

const Playlist = [
  {
  Eventid:"EVN001",
  Eventname:"Worlds day",
  Eventimage:"https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},{
  Eventid:"EVN002",
  Eventname:"DNK",
  Eventimage:"https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},{
  Eventid:"EVN003",
  Eventname:"LNKFNL",
  Eventimage:"https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},  {
  Eventid:"EVN004",
  Eventname:"Worlds day",
  Eventimage:"https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},{
  Eventid:"EVN005",
  Eventname:"DNK",
  Eventimage:"https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},{
  Eventid:"EVN006",
  Eventname:"LNKFNL",
  Eventimage:"https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}
]

function Events() {
  
  return (
    <Box>
    <Typography variant="h5" sx={{my:2, mx:1, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main' }}>
      Gallary
    </Typography>

    <Stack spacing={2} direction="row" sx={{mt:2}} >
    <Box sx={{ position:'relative', display:{lg:'flex', xs:'none'}}} >
      <SearchIcon sx={{position:'absolute', top:'5px', left:'5px', color:'grey'}} /> 
      <input type="search" />
    </Box>
    <Button variant="contained" sx={{bgcolor: 'secondary.main',textTransform: 'none', borderRadius: 2 ,":hover":{backgroundColor: 'secondary.light'} }} > Search</Button>
    <Button variant="contained" sx={{bgcolor: 'secondary.main',textTransform: 'none', borderRadius: 2 ,":hover":{backgroundColor: 'secondary.light'} }} > Refresh</Button>
    </Stack>
    <Box
          sx={{
            margin:'20px 0px',
            shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '150px',
            py: 0.5,
            pl: 1,
            bgcolor: '#155693',
            color:'white',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'}}>Playlist</Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Playlist.slice(0, 6).map((event, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Box>
              <img src={event.Eventimage} alt={event.Eventname} style={{ width: '100%', height: 'auto' }} />
              <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography  sx={{my:2, mx:1, fontWeight:'600', fontSize:'1.3rem', color:'primary.main' }}>{event.Eventname}</Typography>
              <Link to={`/media/event-gallery/${event.Eventid}`}>
              <ArrowOutwardIcon sx={{ color: '#155693' }} />
              </Link>
              </Box>
            </Box>
          </Grid>
        ))}
</Grid>
<Box display="flex" justifyContent="center" marginTop="20px">
      <Typography textAlign="center">More</Typography>
    </Box>
  </Box>
  )
}

export default Events;



// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Typography,
//   Box,
//   Stack,
//   Button,
//   Container,
//   CircularProgress,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Events() {
//   const [media, setMedia] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     fetchMedia();
//   }, [page]);

//   const fetchMedia = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_BASE_MEDIA_URL}/fetch-media`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkxMWUyYTQ3NzZkZjdmMzk5YmVkZWIiLCJlbWFpbCI6ImhhcnNoaXRqb3NoaTIwMDJAZ21haWwuY29tIiwiaWF0IjoxNzIwODU5NDQ5fQ.gE08vAooPS-1o6NparMCr_QMIRKpJfoqPfwiU7-bFLk`,
//           },
//           params: {
//             page: page,
//             limit: 6,
//           },
//         }
//       );
//       const newMedia = response.data.data;
//       setMedia((prevMedia) => [...prevMedia, ...newMedia]);
//       setHasMore(response.data.pagination.hasNextPage);
//     } catch (error) {
//       console.error("Error fetching media:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     if (hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <Box>
//       <Typography
//         variant="h5"
//         sx={{
//           my: 2,
//           mx: 1,
//           fontWeight: "600",
//           fontSize: { lg: "1.8rem", xs: "1rem" },
//           color: "primary.main",
//         }}
//       >
//         Gallery
//       </Typography>

//       <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
//         <Box sx={{ position: "relative", display: { lg: "flex", xs: "none" } }}>
//           <SearchIcon sx={{ position: "absolute", top: "5px", left: "5px", color: "grey" }} />
//           <input type="search" />
//         </Box>
//         <Button
//           variant="contained"
//           sx={{ bgcolor: "secondary.main", textTransform: "none", borderRadius: 2, ":hover": { backgroundColor: "secondary.light" } }}
//         >
//           Search
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ bgcolor: "secondary.main", textTransform: "none", borderRadius: 2, ":hover": { backgroundColor: "secondary.light" } }}
//         >
//           Refresh
//         </Button>
//       </Stack>

//       <Box
//         sx={{
//           margin: "20px 0px",
//           boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//           width: "150px",
//           py: 0.5,
//           pl: 1,
//           bgcolor: "#155693",
//           color: "white",
//           fontSize: "0.9rem",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-evenly",
//         }}
//       >
//         Playlist
//       </Box>

//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {media.map((event, index) => (
//           <Grid item xs={2} sm={4} md={4} key={index}>
//             <Box>
//               <img src={event.data[0].href} alt={event.name} style={{ width: "100%", height: "auto" }} />
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography sx={{ my: 2, mx: 1, fontWeight: "600", fontSize: "1.3rem", color: "primary.main" }}>
//                   {event.name}
//                 </Typography>
//                 <Link to={`/media/event-gallery/${event._id}`}>
//                   <ArrowOutwardIcon sx={{ color: "#155693" }} />
//                 </Link>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       {loading && (
//         <Box display="flex" justifyContent="center" marginTop="20px">
//           <CircularProgress />
//         </Box>
//       )}

//       {hasMore && !loading && (
//         <Box display="flex" justifyContent="center" marginTop="20px">
//           <Button variant="contained" onClick={handleLoadMore}>
//             Load More
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default Events;