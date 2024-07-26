import React, { useEffect, useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 250;

  const drawer = (
    <Box sx={{ width: drawerWidth, bgcolor: "#f3f4f5", borderRadius: "8px" }}>
      <DashboardSidebar />
    </Box>
  );

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
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ ml: 1, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: "flex", flex: 1, pt: 8 }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {isMobile && (
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Outlet />
          </Box>
        )}
        {!isMobile && (
          <Box sx={{ flex: 1, overflowY: "auto", pl: `${drawerWidth}px` }}>
            <Outlet />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardHome;
