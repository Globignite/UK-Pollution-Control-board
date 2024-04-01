import { Box, Grid, Paper, Typography } from '@mui/material';

const legislationItems = [
  { title: 'Environmental Act', icon: 'some-icon-path' },
  // Add more items as necessary
];

const EnvironmentLegislation = () => {
  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        {legislationItems.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="body1">{item.title}</Typography>
              {/* Icon component or img tag for the icon */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EnvironmentLegislation;
