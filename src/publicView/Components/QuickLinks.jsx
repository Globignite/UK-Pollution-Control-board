import { Box, Stack, Grid, Paper, Typography, styled } from '@mui/material';
import React from 'react';

const QuickLinks = () => {

  const Links = [
    {
      id: '1',
      title: 'News',
      img_link: '/assets/news-report_1.png'
    },
    {
      id: '2',
      title: 'Recruitments',
      img_link: '/assets/recruitments.png'
    },
    {
      id: '3',
      title: 'Tenders',
      img_link: '/assets/tenders.png'
    },
    {
      id: '4',
      title: 'Important Office Orders / Letters / Directions',
      img_link: '/assets/important_office_orders.png'
    },
    {
      id: '5',
      title: 'Court/ Tribunal-Judgements Orders',
      img_link: '/assets/law_1.png'
    },
    {
      id: '6',
      title: 'Download',
      img_link: '/assets/download_1.png'
    }
  ]

  const CircleBox = styled(Box)(({theme}) => ({
      width:'450px',
      height:'440px',
      backgroundColor: theme.palette.secondary.lightest,
      // backgroundColor: 'pink',
      position:'absolute',
      bottom: '-60px',
      right: '-50px',
      borderRadius: '50%'
  }));

  const ImageBox = styled(Box)(({theme}) => ({
    width: '100%',
    height: '100%',
    position:'absolute',
    backgroundImage: "url('/assets/man_with_mobile.png')",
    backgroundRepeat:'no-repeat',
    bottom:'-100px',
    right:'-60px'
  }));

  return (
    <Grid container direction="row" sx={{bgcolor:'secondary.light' }} >
      {/* left links */} 
        <Grid item lg={6} xs={12} container  sx={{py:3, pr:{lg:2, xs:0}, pl:{lg:2, xs:0} }} > 
          <Stack sx={{display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-evenly', flexDirection:'row'}}  >

            {
              Links.map(({id, title, img_link}) =>{
                return(
                  <React.Fragment key={id}>
                    <Paper  sx={{ width:{lg:'180px', xs:'120px'}, height:{lg:'180px', xs:'120px'}, boxShadow:'none', m:1, py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                      <Box sx={{width:{lg:'70px', xs:'50px'}, height:{lg:'70px', xs:'50px'}}} >
                         <img src={img_link} alt={'link_logo'} loading='lazy' style={{ width:'100%', height:'100%' }} />
                      </Box>
                      <Typography align="center" sx={{fontWeight:'600', color:'secondary.main', fontSize:{lg:'1rem', xs:'0.7rem'}}} > {title} </Typography>
                    </Paper>
                  </React.Fragment>
                ) 
              })
            }
          </Stack>
        </Grid>

        {/* right image */}
        <Grid item lg={6} xs={0} container sx={{position:'relative', overflow:'hidden'}} >
            <CircleBox /> 
            <ImageBox />
        </Grid>
    </Grid>
  );
};

export default QuickLinks;
