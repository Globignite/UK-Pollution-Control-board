import { Box, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const DashboardSidebar = () => {


  const isActive = (href) => {
    return location.pathname.startsWith(href);
};

  return (
    <Box sx={{height:'75vh', display:'flex', flexDirection:'column', alignItems:'center', py:5, bgcolor:'background.header', width:'100%'}} >
        <Box sx={{width:'80%'}} >
          <Box component={RouterLink} to={'/dashboard/upload-files'} 
          sx={{bgcolor:'', 
            '&:hover':{color:'secondary.light'},
           py:2, display:'flex', alignItems:'center', color: isActive('/dashboard/upload-files')?'#000':'grey'}} >
            <InsertDriveFileIcon sx={{mr:1, fontSize:'small', color:'secondary.light', width:'20px', height:'20px'}} />
            <Typography variant="body1" sx={{fontWeight:'bold'}} >File Upload </Typography>
          </Box>
          <Box component={RouterLink} to={'/signIn'} 
          sx={{bgcolor:'', 
            '&:hover':{color:'secondary.light'},
           py:2, display:'flex', alignItems:'center', fontWeight:'bold', color: isActive('/signIn')?'#000':'grey'}} >
            <RocketLaunchIcon sx={{mr:1, fontSize:'small', bgcolor:isActive('/signIn')?'secondary.light':'', color:isActive('/signIn')?'#fff':'secondary.light', width:'20px', height:'20px', p:'2px', borderRadius:'5px'}} />
            <Typography variant="body1">Logout</Typography>
          </Box>
        </Box>
    </Box>
  )
}

export default DashboardSidebar