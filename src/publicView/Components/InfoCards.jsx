import { Card, CardContent, Typography, Box, Stack, Paper, Grid, styled } from '@mui/material';

const InfoCards = () => {

  
  const ImageBox1 = styled(Box)(({theme}) => ({
    width: '100%',
    height:'55%',
    backgroundImage:"url('./assets/OBJECTS.png')",
    backgroundRepeat:'no-repeat',
    position:'absolute',
    bottom:'0px',
    left:'-1px'
}));
  const ImageBox2 = styled(Box)(({theme}) => ({
    width: '100%',
    height:'55%',
    backgroundImage:"url('./assets/Group.png')",
    backgroundRepeat:'no-repeat',
    position:'absolute',
    bottom:'0px',
    left:'-1px'
}));

  return (
    <Box sx={{my:2, mx:{lg:0, xs:1}}} >
        <Stack spacing={{lg:3, xs:1}} direction="row" >

            <Paper elevation={3} sx={{width:{lg:'300px', md:'50%', sm:"40%", xs:'50%'}, height:{lg:"150px"}, borderRadius:'15px', bgcolor:'secondary.main', color:'#fff' }} >
              <Grid container direction="row">
                <Grid item xs={6} sx={{position:'relative'}} >
                  <ImageBox1 />
                </Grid>
                <Grid item xs={6} >
                  <Typography sx={{py:2, pr:1, fontWeight:'580',height:{lg:"150px", xs:'100px'}, fontSize:{lg:'1.1rem', xs:'0.6rem'} }} >
                    Covid 19 Bio medical waste management at health care facility
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{width:{lg:'300px', md:'50%', sm:'40%', xs:'50%'},height:{lg:"150px"}, borderRadius:'15px', bgcolor:'primary.main', color:'#fff' }} >
              <Grid container direction="row">
                <Grid item xs={6} sx={{position:'relative'}} >
                  <ImageBox2 />
                </Grid>
                <Grid item xs={6} sx={{ height:{lg:"150px", xs:'100px'},  display:'flex', alignItems:'center' }} >
                  <Typography sx={{py:2, pr:1, fontWeight:'580', fontSize:{lg:'1.1rem', xs:'0.7rem'}}} >
                    NCAP Portal
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
        </Stack>
    </Box>
  );
};

export default InfoCards;
