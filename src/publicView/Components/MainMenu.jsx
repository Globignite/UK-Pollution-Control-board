import { useState, useEffect, useRef  } from 'react';
import { List, ListItem, ListItemText, Collapse, Box, styled } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { mainMenu } from '../JsonFiles/MainMenu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const MenuItem = styled(ListItem)(({ theme }) => ({
    cursor: 'pointer',
    color:'grey',
    '&:hover': {
      backgroundColor: theme.palette.grey[100], 
      color: theme.palette.primary.main,
    },
  }));

const MainMenu = () => {   

  const [open, setOpen] = useState({});
  const [toggle, setToggle] = useState({});
  const navBarRef = useRef(null);
  const [mobileView, setMobileView] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const location = useLocation();

  const handleClickHover = (index) => {
    // setOpen({ ...open, [index]: !open[index] });
    setOpen({ [index]: true });
    // console.log(open)
};

  const handleClick = (index) => {
    setToggle({ ...toggle, [index]: !toggle[index] });
  };

  const handleNavOpen = () =>{
    setToggleNav(true)
  }

  const handleNavClose = () =>{
    setToggleNav(false)
  }

const handleClickLeave = (index) => {
    setOpen({ [index]: false });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current && !navBarRef.current.contains(event.target)) {
        setOpen({});
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1199px)').matches;
    if(isMobile){
      setMobileView(true)
    }else{
      setMobileView(false)
    }

  },[window.innerWidth]);

  useEffect(() => {
    handleNavClose()
    window.scrollTo(0, 0)
  }, [location]);

  return (
    <>
    <Box sx={{display:'flex', width:'100%', position:{lg:'relative', xs:'fixed'}, transition:'all 0.5s liner' ,left:{lg:'0%', xs: toggleNav ? '0%': '100%'}, top:"0%", height:{lg:'100%', xs:'110dvh'}, zIndex:1010 }}>
    <Box sx={{  display:{lg:'none', xs:'flex'}, width:{lg:"0%", md:'50%', xs:'50%'}, bgcolor:'rgba(0,0,0,0.2)' }} onClick={handleNavClose} >
    </Box>
      <List ref={navBarRef} sx={{display:'flex', position:{lg:'relative'}, bgcolor:'background.header', flexDirection:{lg:'row', xs:'column'}, justifyContent:{lg:'center', xs:'start'}, mb:1, width:'100%', fontSize:'0.9rem', py:{lg:0, xs:5}}} disablePadding >
        {mainMenu.map((menuItem) => (
          <Box key={menuItem.name} sx={{bgcolor:'background.header'}}> 
            <MenuItem sx={{ px:0}}  onMouseEnter={() => handleClickHover(menuItem.name)} onMouseLeave={() => handleClickLeave(menuItem.name)} >
                <Box sx={{
                    borderRight: menuItem.name === "Public Hearing"?"": mobileView ? '' :'1px solid grey', 
                    display:'flex',
                    justifyContent:'space-between', 
                    px:2, 
                    width:'100%'
                    }} >
                        {/* <Typography sx={{ textDecoration:open[menuItem.name]?'underline' :"", textUnderlineOffset:'5px', color:open[menuItem.name]?'primary.main':"", fontWeight:'bold', textDecorationThickness:'2px'}} >  */}
                        <Box component={RouterLink} to={menuItem.href} sx={{ color: window.location.pathname === menuItem.href ? 'primary.main' : '#000'}} > 
                        {menuItem.name}
                        {
                            open[menuItem.name] || window.location.pathname === menuItem.href?
                            <div style={{width:"40%", height:'3px',backgroundColor:'#155693'}} ></div>
                            : <div style={{height:'3px'}} ></div>
                        }
                         </Box>
                         {
                          mobileView? 
                          menuItem.subItems && (toggle[menuItem.name] ? <ExpandLess onClick={() => handleClick(menuItem.name)}  sx={{ml:1, color:open[menuItem.name]?'primary.main':""}} /> : <ExpandMore sx={{ml:1}} onClick={() => handleClick(menuItem.name)} />)
                          :
                          menuItem.subItems && (open[menuItem.name] ? <ExpandLess sx={{ml:1, color:open[menuItem.name]?'primary.main':""}} /> : <ExpandMore sx={{ml:1}} />)
                        }
                </Box>
            </MenuItem>
            {menuItem.subItems && (

              <>
              {
                mobileView ? 
                  <Collapse in={toggle[menuItem.name]} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding >
                      {menuItem.subItems.map((subItem) => (
                        <ListItem key={subItem.name} button component={RouterLink} to={subItem.href}  sx={{ pl:4}}  >
                            <ListItemText primary={subItem.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                  :
                  <Collapse in={open[menuItem.name]} timeout="auto"  unmountOnExit sx={{position:'absolute', top:'105%', zIndex:'500', bgcolor:'secondary.navbar', minWidth:'150px' }} onMouseEnter={() => handleClickHover(menuItem.name)} onMouseLeave={() => handleClickLeave(menuItem.name)} >
                    <List component="div" disablePadding >
                      {menuItem.subItems.map((subItem) => (
                        <ListItem key={subItem.name} button component={RouterLink} to={subItem.href} sx={{ bgcolor:''}}  >
                            <ListItemText primary={subItem.name}  />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
              }

              {/* <Collapse in={toggle[menuItem.name]} timeout="auto" unmountOnExit > */}
              </>
            )}
          </Box>
        ))}
      </List>
    </Box>
    <Box sx={{bgcolor:'', width:'100%', display:{xs:'flex', lg:'none'}, justifyContent:'space-between', px:1, py:2}}  >
      <Box sx={{ position:'relative'}} >
        <SearchIcon sx={{position:'absolute', top:'5px', left:'5px', color:'grey'}} /> 
        <input type="search" />
      </Box>
      <MenuIcon sx={{color:'secondary.main'}} onClick={handleNavOpen} />
    </Box>
    </>
  );
}

export default MainMenu