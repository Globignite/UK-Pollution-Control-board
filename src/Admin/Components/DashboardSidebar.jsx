import { Box, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "styled-components";
import filemanagement from "../../../public/assets/filemanagement.svg";
import notice from "../../../public/assets/notice.svg";
import media from "../../../public/assets/media.svg";
import sharp from "../../../public/assets/sharp.svg";

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
  color: ${({ isActive }) => (isActive ? "#fff" : "#3da73c")};
  background-color: ${({ isActive }) => (isActive ? "#3da73c" : "transparent")};
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 5px;
`;

const DropdownMenu = ({ title, items, isActive, basePath, svg }) => {
  const isRender = items.some((item) => isActive(`${basePath}/${item.path}`));

  return (
    <>
      <StyledLinkBox
        sx={{
          bgcolor: isRender ? "#ffffff" : "",
          py: 1,
          borderRadius: 3,
          boxShadow: isRender ? 2 : 0,
        }}
      >
        <Box
          sx={{
            bgcolor: "#3da73c",
            p: 1,
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={svg} alt={title} />
        </Box>
        <Typography
          variant="body1"
          sx={{ color: "#2D3748", pl: 3, fontWeight: "bold" }}
        >
          {title}
        </Typography>
      </StyledLinkBox>
      {items?.map((item) => (
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
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href) => {
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const menuItems = [
    {
      title: "File Management",
      svg: filemanagement,
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
    {
      title: "Notice Board",
      svg: notice,
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
      svg: media,
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
      title: "Banner",
      svg: media,
      items: [
        {
          label: "Add Banner",
          path: "add-banner",
          icon: <StyledChevronRightIcon />,
        },
        {
          label: "Manage Banner",
          path: "manage-banner",
          icon: <StyledChevronRightIcon />,
        },
      ],
    },
    {
      title: "Manage",
      svg: sharp,
      items: [
        {
          label: "Enquiries",
          path: "enquiries",
          icon: <StyledChevronRightIcon />,
        },
        {
          label: "Complaints",
          path: "complaints",
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
            svg={menu.svg}
            isActive={isActive}
            basePath="/dashboard"
          />
        ))}
        {/* <StyledLinkBox
          component={RouterLink}
          to="/signIn"
          isActive={isActive("/signIn")}
          fontWeight="bold"
        >
          <StyledChevronRightIcon isActive={isActive("/signIn")} />
          <Typography variant="body1">Logout</Typography>
        </StyledLinkBox> */}
        <StyledLinkBox onClick={handleLogout} sx={{ cursor: "pointer" }}>
          <StyledChevronRightIcon />
          <Typography variant="body1">Logout</Typography>
        </StyledLinkBox>
      </Box>
    </StyledBox>
  );
};

export default DashboardSidebar;
