import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";

import MyAppBar from "./Components/MyAppBar"; 
import Sidebar from "./Components/Sidebar";
import InfoCards from "./Components/InfoCards";
import WelcomeText from "./Components/WelcomeText";
import EOICard from "./Components/EOICard";
import UsefulInfo from "./Components/UsefulInfo";
import EnvironmentLegislation from "./Components/EnvironmentLegislation";
import NoticesAndUpdates from "./Components/NoticesAndUpdates";
import QuickLinks from "./Components/QuickLinks";
import ServiceHelp from "./Components/ServiceHelp";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Footer";
import RunningText from "./Components/RunningText";
import MainMenu from "./Components/MainMenu";
import TopBar from "./Components/TopBar";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function PublicLayout() {

  
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > document.documentElement.clientHeight / 2) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
	return (
		<>
		  <CssBaseline />
      <TopBar />
      <Box sx={{display:{lg:'none', xs:'flex'}}} >
        <MainMenu />
      </Box>
      <MyAppBar />
      <Box sx={{display:{lg:'flex', xs:'none'}}} >
        <MainMenu />
      </Box>
      {/* <MainBanner /> */}
      <RunningText />
      <Box sx={{display:{lg:'none', md:'none', sm:'flex', xs:'flex'}}} >
        <InfoCards />
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
          </Grid> */}
          <Grid item lg={3} sm={0} xs={0} >
            <Sidebar />
          </Grid>
          <Grid item lg={9} sm={12} xs={12}>
            <Box sx={{borderBottom:{lg:'none', xs:'1px solid grey'} }} ></Box>
            <Box sx={{borderBottom:'1px solid grey', pb:3 }} >
              <Outlet />  
            </Box>
            <Box sx={{display:{lg:'flex', md:'flex', sm:'none', xs:'none'}}} >
              <InfoCards />
            </Box>
            <EOICard />
            <UsefulInfo />
            <EnvironmentLegislation />
            <NoticesAndUpdates />
            <QuickLinks />
          </Grid>
        </Grid>
      </Container>
      <ServiceHelp />
      <Gallery />
      <Footer />
      <Paper elevation={24} onClick={scrollToTop} 
      sx={{ position:'fixed', display: showScrollButton ? 'flex' : 'none', alignItems:'center', justifyContent:'center', width:'50px', height:'50px', borderRadius:'50%', bgcolor:'secondary.main', color:'#fff', top:'85%', left:{lg:'93%', xs:'80%'}, zIndex:1100, cursor:'pointer' }} >
        <KeyboardArrowUpIcon  sx={{ fontSize:'1.5rem' }} />  
      </Paper>
		</>
	);
}

export default PublicLayout;
