import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../Dashboard/Dashboard.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FileUploadIcon from "@mui/icons-material/CloudUpload";
import FileManageIcon from "@mui/icons-material/FolderOpen";
import NoticeIcon from "@mui/icons-material/Announcement";
import UpdateIcon from "@mui/icons-material/Update";
import EventIcon from "@mui/icons-material/Event";
import BannerIcon from "@mui/icons-material/ViewCarousel";
import MarqueeIcon from "@mui/icons-material/TextRotateUp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CommentIcon from "@mui/icons-material/Comment";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard/",
      icon: <DashboardIcon />,
    },
    {
      title: "Enquiries",
      path: "/dashboard/enquiries",
      icon: <ManageAccountsIcon />,
    },
    {
      title: "Complaints",
      path: "/dashboard/complaints",
      icon: <CommentIcon />,
    },
    {
      title: "File Management",
      items: [
        {
          label: "Add File",
          path: "/dashboard/upload-files",
          icon: <FileUploadIcon />,
        },
        {
          label: "Manage File",
          path: "/dashboard/manage-files",
          icon: <FileManageIcon />,
        },
      ],
    },
    {
      title: "Notice Board",
      items: [
        {
          label: "Add Notice",
          path: "/dashboard/add-notice",
          icon: <NoticeIcon />,
        },
        {
          label: "Manage Notice",
          path: "/dashboard/manage-notice",
          icon: <NoticeIcon />,
        },
      ],
    },
    {
      title: "Recent Updates",
      items: [
        {
          label: "Add Updates",
          path: "/dashboard/add-recent-updates",
          icon: <UpdateIcon />,
        },
        {
          label: "Manage Updates",
          path: "/dashboard/manage-recent-updates",
          icon: <UpdateIcon />,
        },
      ],
    },
    {
      title: "Media/Events",
      items: [
        {
          label: "Add Media",
          path: "/dashboard/add-media",
          icon: <EventIcon />,
        },
        {
          label: "Manage Media",
          path: "/dashboard/manage-media",
          icon: <EventIcon />,
        },
      ],
    },
    {
      title: "Banner",
      items: [
        {
          label: "Add Banner",
          path: "/dashboard/add-banner",
          icon: <BannerIcon />,
        },
        {
          label: "Manage Banner",
          path: "/dashboard/manage-banner",
          icon: <BannerIcon />,
        },
      ],
    },
    {
      title: "Marque",
      items: [
        {
          label: "Add Marque",
          path: "/dashboard/add-marque",
          icon: <MarqueeIcon />,
        },
        {
          label: "Manage Marque",
          path: "/dashboard/manage-marque",
          icon: <MarqueeIcon />,
        },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <Typography
        variant="h6"
        sx={{ padding: 2, position: "sticky", top: 0, zIndex:20 }}
        className="navBG"
      >
        UKPCB Dashboard
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.icon ? (
              <ListItem button component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ) : (
              <ListItem to={item.path} className="sideNavHeadings">
                <ListItemText primary={item.title} />
              </ListItem>
            )}

            {item.items &&
              item.items.map((subItem, subIndex) => (
                <ListItem
                  button
                  component={Link}
                  to={subItem.path}
                  key={subIndex}
                >
                  {subItem.icon && <ListItemIcon>{subItem.icon}</ListItemIcon>}
                  <ListItemText primary={subItem.label} />
                </ListItem>
              ))}
            {/* {index !== menuItems.length - 1 && <Divider />} */}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
