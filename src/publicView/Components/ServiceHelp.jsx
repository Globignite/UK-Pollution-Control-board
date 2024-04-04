import { Box, Typography, Stack, Button } from '@mui/material';

const ServiceHelp = () => {
  return (
    <Box sx={{pt:6, pb:3, pl:5, mt:5, border: '1px solid grey', borderRadius:'25px 0px 0px 25px', borderRightColor:'#fff', display: 'flex', justifyContent:'space-between'}} >
      <Box>
        <Typography variant="h4" color={'primary.main'} sx={{fontWeight: '500'}} gutterBottom >
          Need help with a service?
        </Typography>
        <Typography  sx={{fontWeight: '520', fontSize:'1.2rem'}}>
          We are available all days of the week from <br />10 am to 6 pm
        </Typography>
        <Stack direction="row" marginTop={8}>
          <Button variant="contained" sx={{bgcolor: 'secondary.main',textTransform: 'none', borderRadius: 2 , padding:'10px 25px', ":hover":{backgroundColor: 'secondary.main'} }} > Toll Free: 1800-11-5246 </Button>
          {/* Add more buttons or information as needed */}
        </Stack>
      </Box>
      <Box>
        <img src={'./assets/customerCare.png'} alt="important_links" loading='lazy' width="350" heigh="350" />
      </Box>
    </Box>
  );
};

export default ServiceHelp;
