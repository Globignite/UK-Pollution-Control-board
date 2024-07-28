import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Divider,
} from "@mui/material";
import "../Dashboard/Dashboard.css";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

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
  const CustomDrawer = styled(Drawer)({
    "& .MuiDrawer-paper": {
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
    },
  });

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Enquiries",
      path: "/admin/enquiries", 
      icon: <ManageAccountsIcon />,
    },
    {
      title: "Complaints",
      path: "/admin/complaints", 
      icon: <CommentIcon />,
    },
    {
      title: "File Management",
      items: [
        {
          label: "Add File",
          path: "/admin/upload-files", 
          icon: <FileUploadIcon />,
        },
        {
          label: "Manage File",
          path: "/admin/manage-files", 
          icon: <FileManageIcon />,
        },
      ],
    },
    {
      title: "Notice Board",
      items: [
        {
          label: "Add Notice",
          path: "/admin/add-notice", 
          icon: <NoticeIcon />,
        },
        {
          label: "Manage Notice",
          path: "/admin/manage-notice", 
          icon: <NoticeIcon />,
        },
      ],
    },
    {
      title: "Recent Updates",
      items: [
        {
          label: "Add Updates",
          path: "/admin/add-recent-updates", 
          icon: <UpdateIcon />,
        },
        {
          label: "Manage Updates",
          path: "/admin/manage-recent-updates", 
          icon: <UpdateIcon />,
        },
      ],
    },
    {
      title: "Media/Events",
      items: [
        {
          label: "Add Media",
          path: "/admin/add-media", 
          icon: <EventIcon />,
        },
        {
          label: "Manage Media",
          path: "/admin/manage-media", 
          icon: <EventIcon />,
        },
      ],
    },
    {
      title: "Banner",
      items: [
        {
          label: "Add Banner",
          path: "/admin/add-banner", 
          icon: <BannerIcon />,
        },
        {
          label: "Manage Banner",
          path: "/admin/manage-banner", 
          icon: <BannerIcon />,
        },
      ],
    },
    {
      title: "Marque",
      items: [
        {
          label: "Add Marque",
          path: "/admin/add-marque", 
          icon: <MarqueeIcon />,
        },
        {
          label: "Manage Marque",
          path: "/admin/manage-marque", 
          icon: <MarqueeIcon />,
        },
      ],
    },
  ];

  return (
    <CustomDrawer variant="permanent" anchor="left" className="MuiSidebar">
      <Typography
        variant="h6"
        sx={{ padding: 2, position: "sticky", top: 0, zIndex: 20 }}
        className="navBG"
      >
        UKPCB Dashboard
      </Typography>
      <Divider />
      <List>
        {menuItems?.map((item, index) => (
          <div key={index}>
            {item.icon ? (
              <ListItem button component={NavLink} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ) : (
              <ListItem
                to={item.path}
                className="sideNavHeadings"
                sx={{ py: 0 }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            )}

            {item?.items &&
              item?.items?.map((subItem, subIndex) => (
                <ListItem
                  button
                  component={NavLink}
                  to={subItem.path}
                  key={subIndex} 
                >
                  {subItem.icon && <ListItemIcon>{subItem.icon}</ListItemIcon>}
                  <ListItemText primary={subItem.label} />
                </ListItem>
              ))}
            {/* {index !== menuItems.length - 1 && <Divider />} */}
          </div>
        ))}
      </List>
    </CustomDrawer>
  );
};

export default Sidebar;
