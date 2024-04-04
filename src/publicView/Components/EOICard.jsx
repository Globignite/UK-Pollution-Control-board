import { Box, Grid, Paper, Typography, Stack } from '@mui/material';

const EOICard = () => {

  
const UserInfoItems = [
  { 
    title: 'Addendum to Expression of Interest (EOI) ', 
    icon: './src/assets/EOI.png'
  },
  // Add more items as necessary
];

  return (
    <Box padding={2}>
    <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize: '1.8rem', color:'primary.main'}} >
      Expression of Interest (EOI)
    </Typography>
      <Stack direction={'row'} spacing={4} sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}} >
        {UserInfoItems.map(({title, icon}) => (
            <Paper key={title} elevation={24} sx={{ width:'180px', height:'180px', boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
              <img src={icon} alt={'link_logo'} loading='lazy' style={{ width: '70px', height: '70px' }} />
              <Typography align="center" sx={{fontWeight:'530', fontSize:'0.9rem', px:1, color:'#393838'}} > {title} </Typography>
            </Paper>
        ))}
      </Stack>
  </Box>
  );
};

export default EOICard;
