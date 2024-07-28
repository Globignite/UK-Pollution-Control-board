import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const VerticalRecentUpdate = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const defaultParams = {
        path: "null/Recent Updates",
        limit: 20,
        page: 1,
      };
      const response = await axios.get(
        `${baseURL}?path=${defaultParams.path}&limit=${defaultParams.limit}&page=${defaultParams.page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch notifications");
      }
      // console.log("response", response?.data?.data?.data);
      setNotifications(response?.data?.data?.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box
      sx={{
        color: "primary.main",
        fontWeight: "bold",
        fontSize: { lg: "1.2rem", xs: "1rem" },
        bgcolor: "background.header",
        height: "200px", // Set height for the scrolling container
        overflow: "hidden",
        position: "relative",
        borderRadius: "8px",
        border: "1px solid #3da73c",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scrollVertical 10s linear infinite",
        }}
      >
        {notifications?.length > 0
          ? notifications?.map((item, index) => (
              <div key={index} style={{ padding: "10px 0" }}>
                <a
                  href={`https://delightfulbroadband.com${item?.href}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item?.name || "N/A"}
                </a>
              </div>
            ))
          : "*******No Recent Updates*******"}
      </Box>

      <style>
        {`
          @keyframes scrollVertical {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default VerticalRecentUpdate;
