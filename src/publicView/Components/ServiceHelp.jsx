import { Box, Typography, Stack, Button } from '@mui/material';

const ServiceHelp = () => {
  return (
    <Box sx={{pt:{lg:6, xs:2}, pb:{lg:3, xs:3}, pl:{lg:5, xs:2}, width:{xs:"95%", lg:"65%"}, marginLeft:{lg:'auto', sm:0}, mx:{xs:'5px'},  marginRight:{xs:'0%', lg:'7%'}, mt:5, border: '1px solid grey', borderRadius:'25px 0px 0px 25px', borderRightColor:'#fff', display: 'flex', justifyContent:'space-between'}} >
      <Box sx={{width:{lg:'50%', xs:'60%'}}} >
        <Typography color={'primary.main'} sx={{fontWeight: '500', fontSize:{lg:'2rem', sm:'1rem'}}} gutterBottom >
          Need help with a service?
        </Typography>
        <Typography  sx={{fontWeight: '520', fontSize:{lg:'1.2rem', xs:'0.7rem'}}}>
          We are available all days of the week from <br />10 am to 6 pm
        </Typography>
        <Stack direction="row" marginTop={{lg:8, xs:2}}>
          <Button variant="contained" sx={{bgcolor: 'secondary.main', fontSize:{lg:'1rem', xs:'0.7rem'}, textTransform: 'none', borderRadius: 2 , padding:{lg:'10px 25px', sm:'2px 0px'}, ":hover":{backgroundColor: 'secondary.main'} }} > Toll Free: 1800-11-5246 </Button>
          {/* Add more buttons or information as needed */}
        </Stack>
      </Box>
      <Box sx={{width:{lg:'50%', xs:'40%'}}} >
        <img src={'./assets/customerCare.png'} alt="important_links" loading='lazy' width="100%" heigh="100%" />
      </Box>
    </Box>
  );
};

export default ServiceHelp;
