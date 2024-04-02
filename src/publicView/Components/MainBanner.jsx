import * as React from 'react';
import { Box } from '@mui/material';

export default function MainBanner() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/path-to-banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px', // Adjust as necessary
      }}
    >
      {/* Add content if necessary */}
    </Box>
  );
}
