import { Box } from "@mui/material"
import { AdminNavbar } from "./Components/DashboardNavbar"
import DashboardSidebar from "./Components/DashboardSidebar"
import UploadFiles from "./UploadFiles"

const DashboardHome = () => {
  return (
    <Box>
        < AdminNavbar />
        <Box sx={{display:'flex'}} >
            <Box sx={{width:'20%'}} >
                <DashboardSidebar />
            </Box>
            <Box sx={{width:'70%'}} >
                <UploadFiles />
            </Box>
        </Box>


    </Box>
  )
}

export default DashboardHome