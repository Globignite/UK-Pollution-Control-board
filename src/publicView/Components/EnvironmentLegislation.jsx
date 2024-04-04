import { Box, Grid, Paper, Typography, Stack } from '@mui/material';

const legislationItems = [
  { 
    title: 'Environmental Act', 
    icon: './assets/evvironment_act.png'
  },
  { 
    title: 'Environmental Rules', 
    icon: './assets/environment_rules.png'
  },
  { 
    title: 'Environmental Notification', 
    icon: './assets/environment_act2.png'
  },
  { 
    title: 'Environmental Program', 
    icon: './assets/Awarness_program.png'
  },
  // Add more items as necessary
];

const EnvironmentLegislation = () => {
  return (
      <Box padding={2}>
        <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize: '1.8rem', color:'primary.main'}} >
          Environment Legislation
        </Typography>
        {/* <Grid container spacing={2}> */}
          <Stack direction={'row'} spacing={4} sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}} >
            {legislationItems.map(({title, icon}) => (
                <Paper key={title} elevation={24} sx={{ width:'180px', height:'180px', boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                  <img src={icon} alt={'link_logo'} loading='lazy' style={{ width: '70px', height: '70px' }} />
                  <Typography align="center" sx={{fontWeight:'530', fontSize:'0.9rem', px:1, color:'#393838'}} > {title} </Typography>
                </Paper>
            ))}
          </Stack>
        {/* </Grid> */}
      </Box>
  );
};

export default EnvironmentLegislation;
