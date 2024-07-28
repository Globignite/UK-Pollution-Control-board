import  { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./DashboardSidebar";
const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the sign-in page
    navigate("/signIn");
  };

  // for mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AppBar position="fixed" className="navBG">
        <Toolbar>
          {/* Logo */}
          {localStorage.getItem("token") && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2, display: isMobile ? "block" : "none" }} // Only show hamburger icon on mobile
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UKPCB
          </Typography>

          {/* Logout Link */}
          {localStorage.getItem("token") ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {localStorage.getItem("token") && (
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isSidebarOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
        >
          <Sidebar />
        </Drawer>
      )}
    </>
  );
};

export default AdminNavbar;
