import * as React from 'react';
import { Box, Typography, Link, Grid, Container, styled, Input, Button, Stack  } from '@mui/material';
// import { styled } from '@mui/system';

export default function Footer() {

  const FooterLinks = styled(Link)(({theme}) => ({
    color: theme.palette.primary.footer_links,
    textDecorationColor: theme.palette.primary.footer_links,
    fontWeight:'500',
    fontSize: 15,
    padding: '3px 0px',
    '&:hover':{
      color: theme.palette.primary.main,
      textDecorationColor: theme.palette.primary.main,
    },
  }));

  const EmailInput = styled('input')(({theme}) => ({
    width:"70%",
    border: 'none',
    borderRadius: '5px',
    background: '#ffff',
    fontWeight:'500',
    padding: '13px 15px',
    fontSize: "15px",
    '&:focus':{
      outline: 'none',
    }

  }));


  return (
    <Box component="footer" sx={{ bgcolor: 'background.footer', pb:1, pt: 10 }}>
      <Container >

        <Grid container spacing={5} >
          {/* left  */}
          <Grid item lg={5} sm={12} container >
            <Grid item xs={6} container direction="column" >
              <Typography sx={{fontWeight: 600}} >
                Get to know
              </Typography>
              
              <FooterLinks href="#" >Download & Plug-ins</FooterLinks>
              <FooterLinks href="#" >Accessibility Statement</FooterLinks>
              <FooterLinks href="#" >Accessibility Options</FooterLinks>
              <FooterLinks href="#" >Privacy Policy</FooterLinks>
              <FooterLinks href="#" >Hyperlinking Policy</FooterLinks>
              <FooterLinks href="#" >Copyright Policy</FooterLinks>
              <FooterLinks href="#" >Terms & Conditions</FooterLinks>
              <FooterLinks href="#" >Disclaimer</FooterLinks>
              <FooterLinks href="#" >Test Menu</FooterLinks>
            </Grid>

            <Grid item xs={6}  container direction="column" >
              <Typography sx={{fontWeight: 600}} >
                Quick Links
              </Typography>

              <FooterLinks href="#" >Home</FooterLinks>
              <FooterLinks href="#" >About Us</FooterLinks>
              <FooterLinks href="#" >Right To Information</FooterLinks>
              <FooterLinks href="#" >Contact Us</FooterLinks>
              <FooterLinks href="#" >Sitemap</FooterLinks>
              <FooterLinks href="#" >Help</FooterLinks>

            </Grid>
          </Grid>

          {/* right  */}
          <Grid item lg={7} sm={12} >
            <Grid item xs={12}  container direction="column" >
              <Typography sx={{fontWeight: 600}} >
                Subscribe to Our Newsletter
              </Typography>

              <Typography sx={{pt: 2}} >
                The latest news, articles, and resources, sent to your inbox weekly.
              </Typography>

              <Stack spacing={2} direction="row" sx={{mt:2}} >
                <EmailInput type="text" placeholder='Enter your email' />
                <Button variant="contained" sx={{bgcolor: 'secondary.main',textTransform: 'none', borderRadius: 2 ,":hover":{backgroundColor: 'secondary.light'} }} > Subscribe </Button>
              </Stack>

              <Typography sx={{fontWeight: 600, mt: 3}} >
                Useful Links
              </Typography>

              <Stack spacing={4} direction="row" sx={{mt:4, display:'flex', flexWrap:'wrap' }} >
                <Link href="#" > 
                    <img src={'./src/assets/img_link_1.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'./src/assets/img_link_2.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'./src/assets/img_link_3.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'./src/assets/img_link_4.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'./src/assets/img_link_5.jpg'} alt="important_links" loading='lazy'/>
                </Link>

              </Stack>

            </Grid>

          </Grid>
        </Grid>

        <Typography align="center" sx={{ mt:2, color:'primary.main', fontWeight: '800', fontSize: 11}} >
          Site designed, developed and hosted by
        </Typography>

        <Box sx={{my:6, display: 'flex', justifyContent:'space-between', alignItems: 'center'}} >
          <Typography  sx={{fontSize: 12}} >
            Content of this website is published and managed by Uttarakhand Pollution Control Board, Govement Of Uttarakhand, India. <br />
            For any quires regarding this website please contact <Link sx={{cursor:'pointer', fontWeight:'600'}} >Web Information manager</Link>. <br />
            [at] Environment Protection and Pollution Control Board, Government Of Uttarakhand, India.
          </Typography>
          <img src={'./src/assets/logo.png'} alt="logo" width={70} height={70} sx={{width:'50px', height: '50px'}}  />
        </Box>


        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://your-website.com/" >
          UTTARAKHAND POLLUTION CONTROL BOARD 
          </Link> &nbsp; 
          {new Date().getFullYear()}.
        </Typography>

      </Container>
      
    </Box>
  );
}
