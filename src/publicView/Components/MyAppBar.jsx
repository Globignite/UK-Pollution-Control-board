import {Grid, Typography, Box, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MyAppBar = () => {



  return (
    <>
     
      {/* main header */}
      <Box sx={{mb:3,pt:{lg:5, xs:1}}}>
        <Container maxWidth="lg">
          <Grid container >
            <Grid item xs={12} lg={9} sx={{display:'flex', alignItems:'center'}}  >
              <Box width={{lg:90, xs:50}} height={{lg:90, xs:50}} >
                <img src={'/assets/logo.png'} alt="main_logo" width="100%" height="100%" />
              </Box>
              <Box sx={{ml:1}} >
                <Typography variant='h2' sx={{fontSize:{lg:'1.6rem', xs:'0.9rem'}, fontWeight:'560'}}>
                  UTTARAKHAND POLLUTION CONTROL BOARD
                </Typography>
                <Typography sx={{fontSize:{lg:'1.3rem', xs:'0.9rem'}, fontWeight:'500', color:'primary.main'}} >
                  Government Of Uttarakhand
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} lg={3} sx={{display:'flex', alignItems:'center'}} >
              <Box sx={{ position:'relative', display:{lg:'flex', xs:'none'}}} >
                <SearchIcon sx={{position:'absolute', top:'5px', left:'5px', color:'grey'}} /> 
                <input type="search" />
              </Box>
            </Grid>

          </Grid>
        </Container>

    </Box>
    </>
  );
};

export default MyAppBar;
