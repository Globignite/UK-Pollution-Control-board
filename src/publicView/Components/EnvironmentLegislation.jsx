import { Box, Grid, Paper, Typography, Stack } from '@mui/material';

const legislationItems = [
  { 
    title: 'Environmental Act', 
    icon: '/assets/evvironment_act.png'
  },
  { 
    title: 'Environmental Rules', 
    icon: '/assets/environment_rules.png'
  },
  { 
    title: 'Environmental Notification', 
    icon: '/assets/environment_act2.png'
  },
  { 
    title: 'Environmental Program', 
    icon: '/assets/Awarness_program.png'
  },
  // Add more items as necessary
];

const EnvironmentLegislation = () => {
  return (
      <Box padding={{lg:2, xs:0}}>
        <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main'}} >
          Environment Legislation
        </Typography>
        {/* <Grid container spacing={2}> */}
          <Stack direction={'row'} spacing={{lg:4, xs:1}} sx={{display:'flex', pb:2, overflow:{lg:'hidden', xs:'scroll'},  flexDirection:'row', flexWrap:'no-wrap'}} >
            {legislationItems.map(({title, icon}) => (
                <Paper key={title} elevation={24} sx={{ minWidth:{lg:'180px', xs:'130px'}, height:{lg:'180px', xs:'130px'}, m:{lg:0, xs:5},  boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                  <Box sx={{width:{lg:"70px", xs:'50px'}, height:{lg:'70px', xs:'50px'} }} >
                    <img src={icon} alt={'link_logo'} loading='lazy' style={{ width: '100%', height: '100%' }} />
                  </Box>
                  <Typography align="center" sx={{fontWeight:'530', fontSize:{lg:'0.9rem', xs:'0.7rem'}, px:1, color:'#393838'}} > {title} </Typography>
                </Paper>
            ))}
          </Stack>
        {/* </Grid> */}
      </Box>
  );
};

export default EnvironmentLegislation;
