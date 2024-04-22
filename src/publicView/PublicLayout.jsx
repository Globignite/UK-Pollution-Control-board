import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

function PublicLayout() {
 
	return (
		<>
			<CssBaseline />
			<MyAppBar />
			<MainMenu /> 
			{/* <MainBanner /> */}
			<RunningText />
			<Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
          </Grid> */}
          <Grid item lg={3} sm={0} xs={0} >
            <Sidebar />
          </Grid>
          <Grid item lg={9} sm={12} xs={12}>
            <Outlet />
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
		</>
	);
}

export default PublicLayout;
