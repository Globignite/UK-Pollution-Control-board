import React from "react";
import { Box, Typography, Collapse } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "styled-components";

// Import your custom MUI theme
import theme from "../../theme";

const StyledBox = styled(Box)`
  height: 90vh;
  padding: 5px;
  background-color: "#f8fcf8";
  width: 100%;
`;

const StyledLinkBox = styled(Box)`
  background-color: "#ffff";
  padding: 5px 10px;
  display: flex;
  align-items: center;
  color: ${({ isActive }) => (isActive ? "#000" : "grey")};
  width: 100%;
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  margin-right: 5px;
  font-size: small;
  color: ${({ isActive, theme }) => (isActive ? "#fff" : "#3da73c")};
  background-color: ${({ isActive, theme }) =>
    isActive ? "#3da73c" : "transparent"};
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 5px;
`;

const ExpandIcon = styled(({ expanded, ...props }) =>
  expanded ? <ExpandLessIcon {...props} /> : <ExpandMoreIcon {...props} />
)`
  color: ${({ theme }) => "#3da73c"};
`;

const DropdownMenu = ({ title, items, isActive, basePath }) => {
  return (
    <>
      <StyledLinkBox sx={{ bgcolor: "#3da73c", p: 1, borderRadius: 1 }}>
        <Typography variant="body1" sx={{ color: "white" }}>
          {title}
        </Typography>
      </StyledLinkBox>
      {items.map((item) => (
        <StyledLinkBox
          key={item.path}
          component={RouterLink}
          to={`${basePath}/${item.path}`}
          isActive={isActive(`${basePath}/${item.path}`)}
        >
          {item.icon}
          <Typography variant="body1">{item.label}</Typography>
        </StyledLinkBox>
      ))}
    </>
  );
};

const DashboardSidebar = () => {
  const isActive = (href) => {
    return window.location.pathname.startsWith(href);
  };

  const menuItems = [
    {
      title: "File Management",
      items: [
        {
          label: "Add File",
          path: "upload-files",
          icon: <StyledChevronRightIcon />,
        },
        {
          label: "Manage File",
          path: "manage-files",
          icon: <StyledChevronRightIcon />,
        },
      ],
    },
    // {
    //   title: "Menu Management",
    //   items: [
    //     {
    //       label: "Add Menu",
    //       path: "add-menu",
    //       icon: <StyledChevronRightIcon />,
    //     },
    //     {
    //       label: "Edit Menu",
    //       path: "edit-menu",
    //       icon: <StyledChevronRightIcon />,
    //     },
    //   ],
    // },
    {
      title: "Notice Board",
      items: [
        {
          label: "Add Notice",
          path: "add-notice",
          icon: <StyledChevronRightIcon />,
        },
        {
          label: "Manage Notice",
          path: "manage-notice",
          icon: <StyledChevronRightIcon />,
        },
      ],
    },
    {
      title: "Media/Events",
      items: [
        {
          label: "Add Media",
          path: "add-media",
          icon: <StyledChevronRightIcon />,
        },
        {
          label: "Manage Media",
          path: "manage-media",
          icon: <StyledChevronRightIcon />,
        },
      ],
    },
    {
      title: "Manage",
      items: [
        {
          label: "Enquiries",
          path: "enquiries",
          icon: <StyledChevronRightIcon />,
        },
        {
          label: "Complaints",
          path: "complains",
          icon: <StyledChevronRightIcon />,
        },
      ],
    },
  ];

  return (
    <StyledBox>
      <Box sx={{ width: "80%" }}>
        {menuItems.map((menu, index) => (
          <DropdownMenu
            key={index}
            title={menu.title}
            items={menu.items}
            isActive={isActive}
            basePath="/dashboard"
          />
        ))}
        <StyledLinkBox
          component={RouterLink}
          to={"/signIn"}
          isActive={isActive("/signIn")}
          fontWeight="bold"
        >
          <StyledChevronRightIcon isActive={isActive("/signIn")} />
          <Typography variant="body1">Logout</Typography>
        </StyledLinkBox>
      </Box>
    </StyledBox>
  );
};

export default DashboardSidebar;
