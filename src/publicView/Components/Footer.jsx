import * as React from 'react';
import { Box, Typography, Grid, Container, styled, Input, Button, Stack  } from '@mui/material';
import { Link } from 'react-router-dom';
// import { styled } from '@mui/system';

export default function Footer() {

  const FooterLinks = styled(Link)(({theme}) => ({
    color: theme.palette.primary.footer_links,
    // textDecorationColor: theme.palette.primary.footer_links,
    textDecoration: 'underline',
    textDecorationColor: 'grey',
    fontWeight:'600',
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
    <Box component="footer" sx={{ bgcolor: 'background.footer', pb:1, pt:{xs:0, lg:10} }}>
      <Container >

        <Grid container spacing={5} sx={{flexDirection:{xs:'column-reverse', lg:'row'}}} >
          {/* left  */}
          <Grid item lg={5} sm={12} sx={{display:'flex', justifyContent:'space-between'}} container >
            <Grid item xs={6} container direction="column" >
              <Typography sx={{fontWeight: 600, color:'primary.footer_links'}} >
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
              <Typography sx={{fontWeight: 600, color:'primary.footer_links'}} >
                Quick Links
              </Typography>

              <FooterLinks to="/" >Home</FooterLinks>
              <FooterLinks to="/about-us" >About Us</FooterLinks>
              <FooterLinks to="/111-right-to-information(rti)" >Right To Information</FooterLinks>
              <FooterLinks to="/contact-us" >Contact Us</FooterLinks>
              <FooterLinks to="#" >Sitemap</FooterLinks>
              <FooterLinks to="#" >Help</FooterLinks>
              <FooterLinks to="/signIn" >Login</FooterLinks>

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
                    <img src={'/assets/img_link_1.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'/assets/img_link_2.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'/assets/img_link_3.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'/assets/img_link_4.jpg'} alt="important_links" loading='lazy'/>
                </Link>
                <Link href="#" > 
                    <img src={'/assets/img_link_5.jpg'} alt="important_links" loading='lazy'/>
                </Link>

              </Stack>

            </Grid>

          </Grid>
        </Grid>

        <Typography align="center" sx={{ mt:2, color:'primary.main', fontWeight: '800', fontSize: 11}} >
          Site designed, developed and hosted by
        </Typography>

        <Box sx={{my:6, display: 'flex', mt:{lg:3, xs:2}, flexDirection:{xs:'column', lg:'row'} ,  justifyContent:'space-between', alignItems: 'center'}} >
          <Typography  sx={{fontSize: 12, mb:{xs:6, lg:0}}} >
            Content of this website is published and managed by Uttarakhand Pollution Control Board, Govement Of Uttarakhand, India. <br />
            For any quires regarding this website please contact <Link sx={{cursor:'pointer', fontWeight:'600'}} >Web Information manager</Link>. <br />
            [at] Environment Protection and Pollution Control Board, Government Of Uttarakhand, India.
          </Typography>
          <img src={'/assets/logo.png'} alt="logo" width={70} height={70}  />
        </Box> 


        <Typography variant="body2" color="text.secondary" align="center" sx={{fontSize:{xs:10, lg:15}}} >
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
