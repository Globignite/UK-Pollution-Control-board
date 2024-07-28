import { useEffect,useState} from "react";
import {
  Grid,
  Typography,
  Box,  
  Card,
  CardMedia,
} from "@mui/material";   
import axios from "axios";
import { useParams } from 'react-router-dom';

// const mediaItems = [
//   {
//     type: "image",
//     src: "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     title: "Image 1",
//   },
//   {
//     type: "video",
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     title: "Video 1",
//   },
//   {
//     type: "image",
//     src: "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     title: "Image 2",
//   },
//   {
//     type: "video",
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     title: "Video 2",
//   },
// ];

function EventGallery() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);

  const fetchMedia = async (id) => {
    try {
      const response = await axios.get(`https://delightfulbroadband.com/api/media/fetch-single-media/${id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(response?.data?.data);
      setEvent(response?.data?.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };
  useEffect(()=>{
    fetchMedia(id);
  },[])

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
       {event?.name}
      </Typography>
      <Typography variant="body2">{event?.createdAt}</Typography>

      <Typography variant="body2" sx={{ my: 2 }}>
       {event?.description}
      </Typography>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {event?.data?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                {item.type === "Photo" ? (
                  <CardMedia
                    component="img"
                    alt={item.title}
                    style={{borderRadius:'8px'}}
                    height="140"
                    image={`https://delightfulbroadband.com${item?.href}`}
                    title={item?.media_name}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    controls
                    style={{borderRadius:'8px'}}
                    alt={item.title}
                    height="140"
                    src={`https://delightfulbroadband.com${item?.href}`}
                    title={item?.media_name}
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
