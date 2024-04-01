import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const MyAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Uttarakhand Pollution Control Board
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
