import * as React from 'react';
import { Grid, Paper } from '@mui/material';

export default function Gallery() {
  const galleryItems = [
    { title: 'Cleaning Drive', img: '/path-to-image.jpg' },
    { title: 'Pollution Control', img: '/path-to-image.jpg' },
    // Add more items as necessary
  ];

  return (
    <Grid container spacing={2}>
      {galleryItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.title}>
          <Paper>
            <img src={item.img} alt={item.title} style={{ width: '100%', height: 'auto' }} />
            <p>{item.title}</p>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
