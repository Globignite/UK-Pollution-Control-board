import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardNavbar = () => {
  return (
    <div>
        <Box sx={{width:'100%', height:'50px', display:'flex', bgcolor:'background.header',  }} >
            <Box component={Link} to="/dashboard/upload-files" sx={{width:'50%', height:'100%', borderBottom: window.location.pathname === '/dashboard/upload-files'? '3px solid #155693' : '2px solid background.header', '&:hover':{color:'black'}, borderRight:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}} >Upload Files</Box>
            <Box component={Link} to="/dashboard/add-heading"  sx={{width:'50%', height:'100%', borderBottom: window.location.pathname === '/dashboard/add-heading'? '3px solid #155693' : '2px solid background.header', '&:hover':{color:'black'}, display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}>Add Headings</Box>
        </Box>
    </div>
  )
}

export default DashboardNavbar


export const AdminNavbar = () => {


  return(
    <>
      <Box sx={{ display:'flex', bgcolor:'background.header', height:'50px', justifyContent:'space-between', px:2, alignItems:'center' }} >
        <Box sx={{width:'50%', display:'flex', alignItems:'center', fontWeight:'bold'}} >
          <img src="/assets/logo.png" alt="" width="30px" height="30px" style={{marginRight:'5px'}} />
          UKPCB Admin
        </Box>
        <Box sx={{ width:'50%', display:'flex', justifyContent:'flex-end', mr:{lg:5, xs:1}, alignItems:'center', bgcolor:'' }} >
          {
            window.location.pathname === '/signIn'?
            <Link to='/' > Home </Link>
            :
            <>
              <Box component={Link} sx={{display:'flex', alignItems:'center', color: window.location.pathname==='/dashboard/upload-files'? 'primary.main':'black', fontWeight:window.location.pathname==='/dashboard/upload-files'?'bold':'light'}} to='/dashboard/upload-files' > Upload File </Box>
              <Box component={Link} sx={{display:'flex', alignItems:'center', ml:{lg:4, xs:2},  color:'black' }} to='/signIn' >  Logout </Box>
            </>
          }
        </Box>
      </Box>
    </>
  )

}