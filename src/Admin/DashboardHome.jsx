import { Box } from "@mui/material";
import { AdminNavbar } from "./Components/DashboardNavbar";
import DashboardSidebar from "./Components/DashboardSidebar";
import UploadFiles from "./FileManagement/UploadFiles";
import { Outlet } from "react-router-dom";

const DashboardHome = () => {
  return (
    <Box>
      <AdminNavbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "250px", bgcolor: "#f3f4f5", borderRadius: "8px" }}>
          <DashboardSidebar />
        </Box>
        <Box sx={{ width: "clac(100% - 250px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome;
