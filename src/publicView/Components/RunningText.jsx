import {Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";

const RunningText = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("https://delightfulbroadband.com/api/marquee", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch notifications");
      }

      setNotifications(response?.data?.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(()=>{
    fetchNotifications()
  })


  return (
    <Box sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: { lg: '1.2rem', xs: '1rem' }, bgcolor: 'background.header'}}>
    <Marquee>
      {notifications.length > 0
        ? notifications.map((notification, index) => (
            <span key={index} style={{padding:'0px 15px'}}>
             <a href={`https://delightfulbroadband.com${notification?.file_data?.href}`}>{notification?.marquee_title || 'N/A'}</a>
            </span>
          ))
        : "*******Marquee*******"}
    </Marquee>
  </Box>
  )
}

export default RunningText