import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Link, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SideMenu } from '../JsonFiles/SideMenu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function Sidebar() {

  const [open, setOpen] = useState({});
  const [openSub, setOpenSub] = useState({});
  const [mobileView, setMobileView] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);
  const location = useLocation();

  const handleClick = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const handleClickSub = (index) => {
    setOpenSub({ ...openSub, [index]: !openSub[index] });
  };

  const handleNavOpen = () =>{
    setToggleNav(true)
  }

  const handleNavClose = () =>{
    setToggleNav(false)
  }

  useEffect(() => {
    handleNavClose()
  }, [location]);

  // console.log(window.location.pathname)

  return (
    <>

     <Box sx={{display:'flex', width:'100%', position:{lg:'relative', xs:'fixed'},  transition:'all 0.5s liner' ,left:{lg:'0%', xs: toggleNav ? '0%': '-100%'}, top:"0%", zIndex:1000 }}>
      <List sx={{display:'block', width:{lg:'100%', md:'70%', xs:'80%'},  bgcolor:'background.header', height:{lg:'100%',xs:'100dvh'}, overflow:{lg:'hidden',xs:'scroll'}, py:5, '&:hover':{color:'pink'} }} >
        {SideMenu.menu.map((menuItem) => (
          <Box key={menuItem.name}   >
            <ListItem sx={{borderBottom:'1px solid #EEEEEE', cursor:'pointer', bgcolor: window.location.pathname == menuItem.href? 'primary.main': 'background.header', }} button  >
              {/* <ListItemText primary={menuItem.name}  /> */}
              <Link
              component={RouterLink}
              to={menuItem.href}
              // variant="body1"
              sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize:{lg:'1.2rem'}, color: window.location.pathname == menuItem.href ? '#fff' : 'primary.main'}}
              underline="none"
            >
              {menuItem.name}
            </Link>
              {menuItem.subItems && (open[menuItem.name] ? <ExpandLess sx={{color:window.location.pathname == menuItem.href ? '#fff' : 'primary.main'}}  onClick={() => handleClick(menuItem.name)} /> : <ExpandMore sx={{color:window.location.pathname == menuItem.href ? '#fff' : 'primary.main'}} onClick={() => handleClick(menuItem.name)} />)}
            </ListItem>
            {menuItem.subItems && (
              <Collapse in={open[menuItem.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menuItem.subItems.map((subItem) => (
                    <div key={subItem.name}>
                    {
                      subItem?.subItems ?
                        <ListItem key={subItem.name} sx={{pl:5}}  button >
                          {/* <ListItemText primary={subItem.name} /> */}
                          <Link
                            component={RouterLink}
                            to={subItem.href}
                            variant="body1"
                            sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', color:'red' }}
                            underline="none"
                          >
                            {subItem.name}
                          </Link>
                          {subItem.subItems && (openSub[subItem.name] ? <ExpandLess onClick={() => handleClickSub(subItem.name)} /> : <ExpandMore onClick={() => handleClickSub(subItem.name)} />)}
                        </ListItem>
                        :
                        <ListItem key={subItem.name} sx={{pl:5}}  button >
                          {/* <ListItemText primary={subItem.name} /> */}
                          <Link
                            component={RouterLink}
                            to={subItem.href}
                            variant="body1"
                            color="red"
                            sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                            underline="none"
                          >
                            {subItem.name}
                          </Link>
                          {subItem.subItems && (openSub[subItem.name] ? <ExpandLess onClick={() => handleClickSub(subItem.name)} /> : <ExpandMore onClick={() => handleClickSub(subItem.name)} />)}
                        </ListItem>

                    }
                    {
                      subItem?.subItems && (
                        <Collapse in={openSub[subItem.name]} timeout="auto" unmountOnExit >
                          <List component="div" disablePadding > 
                            {
                              subItem.subItems.map((subItem) => (
                                  <ListItem key={subItem.name} sx={{pl:8}} button >
                                    {/* <ListItemText primary={subItem.name} /> */}
                                    <Link
                                      component={RouterLink}
                                      to={subItem.href}
                                      variant="body1"
                                      color="red"
                                      sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                      underline="none"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </ListItem>
                              ))
                            }
                          </List>
                        </Collapse>
                      )
                    }
                    </div> 
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
      <Box sx={{  display:{lg:'none', xs:'flex'}, width:{lg:"0%", md:'30%', xs:'20%'}, bgcolor:'rgba(0,0,0,0.2)' }} onClick={handleNavClose}  >

      </Box>

      </Box>
      <Box sx={{ display:{lg:'none', xs: toggleNav? 'none':'flex'}, justifyContent:'center', alignItems:'start', py:5, position:'fixed', width:'30px', height:'100%', left:'0px', top:'40%', zIndex:1000 }}>
        <Box sx={{ transform:'rotate(-90deg)', shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',  width:'150px', py:0.5, pl:1, bgcolor:'background.footer', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'space-evenly', borderRadius:'0px 0px 5px 5px'   }}  onClick={handleNavOpen} >
            MENU
            <KeyboardArrowDownIcon sx={{p:0, m:0}} />
        </Box>
      </Box>
    </>
  );
}
