import React, { useEffect, useState } from "react";
import "../index.css";
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardSidebar from "./Components/DashboardSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar";

const DashboardHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // protected routing
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [window.location.pathname]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AdminNavbar />
      {isMobile && (
        <Box sx={{ flex: 1, overflowY: "auto", pt: "80px", pb: "50px" }}>
          <Outlet />
        </Box>
      )}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pl: "220px",
            pt: "80px",
            pb: "50px",
          }}
        >
          <Outlet />
        </Box>
      )}
    </Box>
  );
};

export default DashboardHome;
