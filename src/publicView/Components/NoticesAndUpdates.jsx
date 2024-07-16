import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import Marquee from "react-marquee-master";
// import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import axios from "axios";

const NoticesAndUpdates = () => {
  const [notifications, setNotifications] = useState([]);
  const [noticeArray, setNoticeArray] = useState([  <a href="https://example.com/item1" key="1" className="custom-marquee-item">
    Item 1
  </a>,
  <a href="https://example.com/item2" key="2" className="custom-marquee-item">
    Item 2
  </a>,
  <a href="https://example.com/item3" key="3" className="custom-marquee-item">
    Item 3
  </a>,
  <a href="https://example.com/item4" key="4" className="custom-marquee-item">
    Item 4
  </a>,
  <a href="https://example.com/item5" key="5" className="custom-marquee-item">
    Item 5
  </a>,
  <a href="https://example.com/item5" key="5" className="custom-marquee-item">
    Item 6 dfasdfasfd sdfasf asdf asf af af asdfsafrawrwer afasdfasrer srj qwe
    rty lkj bnm po asd
  </a>,
  <a href="https://example.com/item5" key="5" className="custom-marquee-item">
    Item 7
  </a>,
  <a href="https://example.com/item5" key="5" className="custom-marquee-item">
    Item 8
  </a>,]);
 
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://delightfulbroadband.com/api/notifications/fetch-notifications",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Notifications:", response?.data?.data);
      setNotifications(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Update noticeArray when notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      const newNotices = notifications.map((notice) => (
        <a
          href={`https://example.com/notices/${notice._id}`}
          key={notice.title}
          className="custom-marquee-item"
        >
          {notice.title}
        </a>
      ));
      setNoticeArray(newNotices);
    }
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log(noticeArray);

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
          <Paper
            elevation={24}
            sx={{
              width: { lg: "190px", xs: "150px" },
              height: { lg: "190px", xs: "150px" },
              boxShadow: "none",
              py: 2,
              bgcolor: "background.lightGreen",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link
              to={"/notices"}
              sx={{
                width: { lg: "70px", xs: "40px" },
                height: { lg: "70px", xs: "40px" },
              }}
            >
              <img
                src={"/assets/notice_1.png"}
                alt={"link_logo"}
                loading="lazy"
                style={{ width: "100%", height: "100%" }}
              />

              <Typography
                align="center"
                sx={{
                  fontWeight: "530",
                  fontSize: "0.9rem",
                  px: 1,
                  color: "#393838",
                }}
              >
                Notice
              </Typography>
            </Link>
          </Paper>
        </Grid>

        <Grid item lg={9} md={9} xs={12} container direction="column">
          <Typography
            variant="h5"
            sx={{
              my: 3,
              fontWeight: "600",
              fontSize: { lg: "1.6rem", xs: "1rem" },
              color: "primary.main",
            }}
          >
            Recent Update
          </Typography>
          <Box
            sx={{
              bgcolor: "background.footer",
              height: "200px",
              borderRadius: "15px",
              px: 2,
              py: 1,
            }}
          >
            <div style={{ height: "50px" }}>
              <Marquee
                marqueeItems={noticeArray}
                delay={60}
                direction="up"
                height={180}
                marqueeClassName="custom-marquee"
                marqueeContainerClassName="custom-marquee-container"
              />
            </div>
          </Box>
          <Link to={"/recent-updates"}>read more</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoticesAndUpdates;
