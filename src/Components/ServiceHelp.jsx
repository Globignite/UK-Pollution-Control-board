import { Box, Typography, Stack, Button } from '@mui/material';

const ServiceHelp = () => {
  return (
    <Box bgcolor="secondary.light" color="primary.contrastText" padding={2}>
      <Typography variant="h5" gutterBottom>
        Need help with a service?
      </Typography>
      <Typography variant="body1">
        We are available all days of the week from 10 am to 6 pm
      </Typography>
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button variant="contained">Contact Us</Button>
        {/* Add more buttons or information as needed */}
      </Stack>
    </Box>
  );
};

export default ServiceHelp;
