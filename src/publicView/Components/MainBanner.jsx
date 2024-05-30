import * as React from 'react';
import { Box, Container, Grid, Typography, styled, Paper  } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

export default function MainBanner() {

  const items = [
    {
        name: "Banner1",
        image: "/assets/banner1.png"
    },
    {
        name: "Banner2",
        image: "/assets/banner1.png"
    },
    {
        name: "Banner3",
        image: "/assets/banner1.png"
    },

];

  return (
    <Carousel 
    indicatorIconButtonProps={{
      style: {
        color:'#f8fcf8',
        margin: '4px',
        '&:hover': {
          color: '#155693'
        }
      }
    }}
    activeIndicatorIconButtonProps={{
      style: {
        color: '#155693'
      }
    }}
    indicatorContainerProps={{
      style: {
        position: 'absolute',
        bottom: '1%',
        left:'5%',
        zIndex:1000,
        textAlign:'center'
      },
    }}
    >
      {items.map(({name,image}) => (
        <Paper key={name} sx={{height:{lg:'400px', xs:'200px'}}} >
          <img src={image} alt={name} width="100%" height="100%" />
        </Paper> 
      ))}
    </Carousel>
  );
}
