import { Box, Grid, Paper, Typography, Stack } from '@mui/material';

const UserInfoItems = [
  { 
    title: 'General Information', 
    icon: './src/assets/general_information.png'
  },
  { 
    title: 'Notice for General Environment Improvement', 
    icon: './src/assets/notice_general_environment_improvement.png'
  },
  { 
    title: 'Uttarkhand Right to service Act, 2011', 
    icon: './src/assets/uttarakhand_right_to_service_Act.png'
  },
  { 
    title: 'steps for covid 19 BMW Android Based App', 
    icon: './src/assets/steps_for_covid_19_BMW.png'
  },
  // Add more items as necessary
];

const UsefulInfo = () => {
  return (
    <Box padding={2}>
    <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize: '1.8rem', color:'primary.main'}} >
      User Information
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

export default UsefulInfo;
