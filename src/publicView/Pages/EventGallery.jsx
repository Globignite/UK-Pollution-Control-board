import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import axios from "axios";
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function EventGallery() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState({ url: "", type: "" });

  const fetchMedia = async (id) => {
    try {
      const response = await axios.get(`https://delightfulbroadband.com/api/media/fetch-single-media/${id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setEvent(response?.data?.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  useEffect(() => {
    fetchMedia(id);
  }, [id]);

  const handleClickOpen = (url, type) => {
    setSelectedMedia({ url, type });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedia({ url: "", type: "" });
  };

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
      <Typography variant="body2">{event?.createdAt?.split("T")[0]}</Typography>

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
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    height="140"
                    image={`https://delightfulbroadband.com${item?.href}`}
                    title={item?.media_name}
                    onClick={() => handleClickOpen(`https://delightfulbroadband.com${item?.href}`, "image")}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    
                    style={{ borderRadius: '8px', cursor: 'pointer' }}
                    alt={item.title}
                    height="140"
                    src={`https://delightfulbroadband.com${item?.href}`}
                    title={item?.media_name}
                    onClick={() => handleClickOpen(`https://delightfulbroadband.com${item?.href}`, "video")}
                  />
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 3,
              top: 2,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedMedia.type === "image" ? (
            <img
              src={selectedMedia.url}
              alt="Selected"
              style={{ width: '100%', height: 'auto' }}
            />
          ) : selectedMedia.type === "video" ? (
            <div style={{display:"flex", justifyContent:"center"}}>
            <video
              src={selectedMedia.url}
              controls
              style={{ width: 'auto',maxWidth:"100%",height:"auto", maxHeight:"80vh" }}
            /> 
            </div>
           
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default EventGallery;
