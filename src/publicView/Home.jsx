import React from 'react';
import { CssBaseline, Container, Grid, Box } from '@mui/material';
import MyAppBar from '../Components/MyAppBar';
import MainBanner from '../Components/MainBanner';
import Sidebar from '../Components/Sidebar';
import InfoCards from '../Components/InfoCards';
import WelcomeText from '../Components/WelcomeText';
import EOICard from '../Components/EOICard';
import UsefulInfo from '../Components/UsefulInfo';
import EnvironmentLegislation from '../Components/EnvironmentLegislation';
import NoticesAndUpdates from '../Components/NoticesAndUpdates';
import QuickLinks from '../Components/QuickLinks';
import ServiceHelp from '../Components/ServiceHelp';
import Gallery from '../Components/Gallery';
import Footer from '../Components/Footer';

function Home() {
  console.log("change ");
  return (
    <>
      <CssBaseline />
      <MyAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainBanner />
          </Grid>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <InfoCards />
            <WelcomeText />
            <EOICard />
            <UsefulInfo />
            <EnvironmentLegislation />
            <NoticesAndUpdates />
          </Grid>
        </Grid>
      </Container>
      <QuickLinks />
      <ServiceHelp />
      <Gallery />
      <Footer />
    </>
  );
}

export default Home;
