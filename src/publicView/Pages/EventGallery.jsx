    import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';

const mediaItems = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Image 1",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Video 1",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Image 2",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Video 2",
  },
];

function EventGallery() {
  const { id } = useParams();

  const fetchMedia = async (id) => {
    try {
      const response = await axios.get('https://delightfulbroadband.com/api/media/fetch-single-media', {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id: id
        }
      });
      console.log(response?.data?.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  // const fetchMedia =async()=>{
  //   console.log(id);
  //   try {
  //     const response = await axios.get('https://delightfulbroadband.com/api/media/fetch-single-media', {
  //       params: {
  //         id: id
  //       }
  //     });

  
  // }    console.log(response?.data?.data);
  // }catch{

  // }
  useEffect(()=>{
    fetchMedia(id);
  })

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          my: 2,
          mx: 1,
          fontWeight: "600",
          fontSize: { lg: "1.8rem", xs: "1rem" },
          color: "primary.main",
        }}
      >
        Worlds day
      </Typography>
      <Typography variant="body2">12-05-2024</Typography>

      <Typography variant="body2" sx={{ my: 2 }}>
        Worlds Day Description should here
      </Typography>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {mediaItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                {item.type === "image" ? (
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
      
    </Box>
  );
}

export default EventGallery;
