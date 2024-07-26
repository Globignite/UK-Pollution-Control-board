import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the sign-in page
    navigate("/signIn");
  };

  return (
    <AppBar position="fixed" className="navBG">
      <Toolbar>
        {/* Logo */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>

        {/* Logout Link */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
