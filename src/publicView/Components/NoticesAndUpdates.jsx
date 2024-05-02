import { Box, Typography, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';

const NoticesAndUpdates = () => {
  // Sample data array, replace with your actual data
  const notices = ['Notice 1', 'Notice 2'];
  const updates = ['Update 1', 'Update 2'];

  return (
    <Box sx={{p:{lg:2, xs:0}, mb:{lg:0, xs:2}  }}>
      <Grid container spacing={{lg:2, xs:1}} maxWidth="lg" >
        <Grid item lg={3} md={3} xs={12} >
          <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize: {lg:'1.6rem', xs:'1rem'}, color:'primary.main'}} >
            Notices
          </Typography>
          <Paper elevation={24} sx={{ width:{lg:'180px', xs:'130px'}, height:{lg:'180px', xs:'130px'}, boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
          <Box sx={{width:{lg:'70px', xs:'40px'}, height:{lg:'70px', xs:'40px'}}} >
            <img src={'/assets/notice_1.png'} alt={'link_logo'} loading='lazy' style={{ width: '100%', height: '100%' }} />
          </Box>
            <Typography align="center" sx={{fontWeight:'530', fontSize:'0.9rem', px:1, color:'#393838'}} > Notice </Typography>
          </Paper>
        </Grid>

        <Grid item lg={9} md={9} xs={12} container direction="column" >
          <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize:{lg:'1.6rem', xs:'1rem'}, color:'primary.main'}} >
            Recent Update
          </Typography>
          <Box sx={{bgcolor:'background.footer', px:3, py:1, height:'180px', borderRadius:'15px'}} >
            Notice display
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoticesAndUpdates;
