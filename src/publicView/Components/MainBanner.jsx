import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import axios from "axios";
import Carousel from "react-material-ui-carousel";

export default function MainBanner() {
  const [banner, setBanner] = useState([]);

const fetchMainBanner= async () => {
  try {
    const response = await axios.get(
      "https://delightfulbroadband.com/api/banner/fetch-banner",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Banner:", response?.data?.data);
    setBanner(response?.data?.data || []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};
 useEffect(()=>{
  fetchMainBanner();
 },[])


  return (
    <Carousel
      indicatorIconButtonProps={{
        style: {
          color: "#f8fcf8",
          margin: "4px",
          "&:hover": {
            color: "#155693",
          },
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#155693",
        },
      }}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "1%",
          left: "5%",
          zIndex: 1000,
          textAlign: "center",
        },
      }}
    >
      {banner?.map(({ name, href }) => (
        <Paper key={name} sx={{ height: { lg: "400px", xs: "200px" } }}>
          <img
            src={`https://delightfulbroadband.com${href}`}
            alt={name}
            width="100%"
            height="100%"
          />
        </Paper>
      ))}
    </Carousel>
  );
}
