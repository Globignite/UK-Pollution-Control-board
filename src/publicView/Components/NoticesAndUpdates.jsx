
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";
import VerticalRecentUpdate from "./VerticalRecentUpdate";

const NoticesAndUpdates = () => {

  const [loading, setLoading] = useState(false);


  return (
    <Box sx={{ p: { lg: 2, xs: 0 }, mb: { lg: 0, xs: 2 } }}>
      <Grid container spacing={{ lg: 2, xs: 1 }} maxWidth="lg">
        <Grid item lg={3} md={3} xs={12}>
          <Typography
            variant="h5"
            sx={{
              my: 3,
              fontWeight: "600",
              fontSize: { lg: "1.6rem", xs: "1rem" },
              color: "primary.main",
            }}
          >
            Notices
          </Typography>
          <Box className="customNoticePaper" sx={{ textAlign: "center" }}>
            <Link to={"/notices"} className="customNoticeLink">
              <img
                src={"/assets/notice_1.png"}
                alt={"link_logo"}
                loading="lazy"
                className="customNoticeImg"
              />
              <Typography align="center" className="customNoticeText">
                Notice
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item lg={9} md={9} xs={12} container direction="column">
 

          <VerticalRecentUpdate />
          <Link to="/recent-updates">Read More</Link>

 
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoticesAndUpdates;
