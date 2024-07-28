import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Container, Typography, styled } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Gallery() {
  const [media, setMedia] = useState([]);

  const TitleBox = styled(Typography)(({ theme }) => ({
    width: '100%',
    height: '50px',
    position: 'absolute',
    bottom: '0px',
    color: "#fff",
    backgroundColor: theme.palette.secondary.light,
    fontWeight: 'bolder',
    fontSize: { lg: '1.5rem', sm: '1rem' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

  const OverlayBox = styled(Typography)(({ theme }) => ({
    width: '100%',
    height: '97.5%',
    position: 'absolute',
    top: '0',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundImage: "url('/assets/play_button.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }));

  const fetchMedia = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_MEDIA_URL}/fetch-media`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            limit: 8,
          },
        }
      );
      setMedia(response?.data?.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <>
      <Container sx={{ pb: 8, pt: { lg: 10, xs: 5 } }} >
        <Typography variant="h5" align='center' sx={{ fontWeight: 600, fontSize: '1.8rem', pb: 5, color: 'primary.main' }} >
          Gallery
        </Typography>
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
          {media?.map((event) => (
            <Grid item xs={1} sm={4} md={4} key={event?._id}>
              <Link to={`/media/event-gallery/${event?._id}`}>
                <Paper sx={{ position: 'relative' }}>
                  {event?.data[0]?.type === "Photo" ? (
                    <>
                      <img
                        src={`https://delightfulbroadband.com${event?.data[0]?.href}`}
                        alt={event?.name}
                        loading="lazy"
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                      <TitleBox>{event?.name}</TitleBox>
                    </>
                  ) : (
                    <>
                      <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                        <video
                          src={`https://delightfulbroadband.com${event?.data[0]?.href}`}
                          alt={event?.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          controls
                        />
                        <OverlayBox />
                      </Box>
                      <TitleBox>{event?.name}</TitleBox>
                    </>
                  )}
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
