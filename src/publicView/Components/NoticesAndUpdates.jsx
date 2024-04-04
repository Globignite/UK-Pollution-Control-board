import { Box, Typography, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';

const NoticesAndUpdates = () => {
  // Sample data array, replace with your actual data
  const notices = ['Notice 1', 'Notice 2'];
  const updates = ['Update 1', 'Update 2'];

  return (
    <Box padding={2}>
      <Grid container spacing={2} maxWidth="lg" >
        <Grid item xs={3}>
          <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize: '1.6rem', color:'primary.main'}} >
            Notices
          </Typography>
          <Paper elevation={24} sx={{ width:'180px', height:'180px', boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
            <img src={'./assets/notice_1.png'} alt={'link_logo'} loading='lazy' style={{ width: '70px', height: '70px' }} />
            <Typography align="center" sx={{fontWeight:'530', fontSize:'0.9rem', px:1, color:'#393838'}} > Notice </Typography>
          </Paper>
        </Grid>

        <Grid item xs={9} container direction="column" >
          <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize: '1.6rem', color:'primary.main'}} >
            Recent Update
          </Typography>
          <Box sx={{bgcolor:'background.footer', px:3, py:1, height:'180px', borderRadius:'15px'}} >
            d
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoticesAndUpdates;
