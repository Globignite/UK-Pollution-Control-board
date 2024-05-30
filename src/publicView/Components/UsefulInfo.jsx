import { Box, Grid, Paper, Typography, Stack } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const UserInfoItems = [
  { 
    title: 'General Information', 
    icon: '/assets/general_information.png'
  },
  { 
    title: 'Notice for General Environment Improvement', 
    icon: '/assets/notice_general_environment_improvement.png'
  },
  { 
    title: 'Uttarkhand Right to service Act, 2011', 
    icon: '/assets/uttarakhand_right_to_service_Act.png'
  },
  { 
    title: 'steps for covid 19 BMW Android Based App', 
    icon: '/assets/steps_for_covid_19_BMW.png'
  },
  // Add more items as necessary
];

const UsefulInfo = () => {
  return (
    <Box padding={{lg:2, xs:0}}>
        <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main'}} >
        User Information
        </Typography>
        {/* <Carousel arrows={false} showDots={true} renderDotsOutside={renderButtonGroupOutside}>
    <ItemOne>       
    <ItemTwo>
  </Carousel> */}
        {/* <Grid container spacing={2}> */}
          <Stack direction={'row'} spacing={{lg:4, xs:1}} sx={{ pb:2, overflow:{lg:'hidden', xs:'scroll'},  flexDirection:'row', flexWrap:'no-wrap'}} >
            {UserInfoItems.map(({title, icon}) => (
                <Paper key={title} elevation={24} sx={{ minWidth:{lg:'180px', xs:'130px'}, height:{lg:'180px', xs:'130px'}, m:{lg:0, xs:5},  boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexWrap:'no-wrap', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                  <Box sx={{width:{lg:"70px", xs:'50px'}, height:{lg:'70px', xs:'50px'} }} >
                    <img src={icon} alt={'link_logo'} loading='lazy' style={{ width: '100%', height: '100%' }} />
                  </Box>
                  <Typography align="center" sx={{fontWeight:'530', fontSize:{lg:'0.9rem', xs:'0.7rem'}, px:1, color:'#393838' }} > {title} </Typography>
                </Paper>
            ))}
          </Stack>
        {/* </Grid> */}
      </Box>
  );
};

export default UsefulInfo;
