import { Box, Grid, Paper, Typography, Stack } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  { 
    title: 'Draft EIA 2020', 
    icon: '/assets/Awarness_program.png'
  },
  // Add more items as necessary
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 40,
    partialVisible: false
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 30,
    partialVisible: true
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 30,
    partialVisible: true
  }
};

const EnvironmentLegislation = () => {
  return (
      <Box padding={{lg:2, xs:0}}>
        <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main'}} >
          Environment Legislation
        </Typography>
        {/* <Grid container spacing={2}> */}
          {/* <Stack direction={'row'} spacing={{lg:4, xs:1}} sx={{display:'flex', pb:2, overflow:{lg:'hidden', xs:'scroll'},  flexDirection:'row', flexWrap:'no-wrap'}} >
            {legislationItems.map(({title, icon}) => (
                <Paper key={title} elevation={24} sx={{ minWidth:{lg:'180px', xs:'130px'}, height:{lg:'180px', xs:'130px'}, m:{lg:0, xs:5},  boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                  <Box sx={{width:{lg:"70px", xs:'50px'}, height:{lg:'70px', xs:'50px'} }} >
                    <img src={icon} alt={'link_logo'} loading='lazy' style={{ width: '100%', height: '100%' }} />
                  </Box>
                  <Typography align="center" sx={{fontWeight:'530', fontSize:{lg:'0.9rem', xs:'0.7rem'}, px:1, color:'#393838'}} > {title} </Typography>
                </Paper>
            ))}
          </Stack> */}
        {/* </Grid> */}


      
        <Carousel
  additionalTransfrom={0}
  arrows={false}
  autoPlaySpeed={3000}
  centerMode={false}
  className=""
  containerClass="container"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite={false}
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  // partialVisible={false}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={responsive}
  rewind={true}
  rewindWithAnimation={false}
  shouldResetAutoplay
  showDots
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
{legislationItems.map(({title, icon}) => (
                <Paper key={title} elevation={24} sx={{ width:{lg:'190px', xs:'150px'}, height:{lg:'190px', xs:'150px'}, mb:4,  boxShadow:'none', py:2, bgcolor:"background.lightGreen", borderRadius:'10px', display:'flex', flexWrap:'no-wrap', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                  <Box sx={{width:{lg:"70px", xs:'50px'}, height:{lg:'70px', xs:'50px'} }} >
                    <img src={icon} alt={'link_logo'} loading='lazy' style={{ width: '100%', height: '100%' }} />
                  </Box>
                  <Typography align="center" sx={{fontWeight:'530', fontSize:{lg:'0.9rem', xs:'0.7rem'}, px:1, color:'#393838' }} > {title} </Typography>
                </Paper>
            ))}
  </ Carousel>   

      </Box>
  );
};

export default EnvironmentLegislation;
