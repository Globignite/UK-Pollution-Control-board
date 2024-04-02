import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', padding: '30px' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://your-website.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
