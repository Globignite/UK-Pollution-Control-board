import React from "react";
import {Grid, Typography, Box,Stack,Button, Card, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import { Link } from "react-router-dom";

const mediaItems = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Image 1',
  },
  {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Video 1',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Image 2',
  },
  {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Video 2',
  },
];

function EventGallery() {
  return (    <Box>
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
            justifyContent: 'space-evenly'}}>Worlds day</Box>

<Typography  sx={{my:2, mx:1, fontSize:'1.3rem', }}>Worlds Day Description should here</Typography>

<Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {mediaItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {item.type === 'image' ? (
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="140"
                  image={item.src}
                  title={item.title}
                />
              ) : (
                <CardMedia
                  component="video"
                  controls
                  alt={item.title}
                  height="140"
                  src={item.src}
                  title={item.title}
                />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
<Box display="flex" justifyContent="center" marginTop="20px">
      <Typography textAlign="center">More</Typography>
    </Box>
  </Box>);
}

export default EventGallery;
