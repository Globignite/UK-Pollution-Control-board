import { Box, Typography } from '@mui/material';

const WelcomeText = () => {
  return (
    <Box padding={2}>
      <Typography variant="h5" gutterBottom>
        Welcome Uttarakhand Pollution Control Board
      </Typography>
      <Typography variant="body1">
        Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat
      </Typography>
      {/* Add additional content or styling here */}
    </Box>
  );
};

export default WelcomeText;
