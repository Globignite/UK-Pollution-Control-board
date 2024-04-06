import { useState, useEffect, useRef  } from 'react';
import { List, ListItem, ListItemText, Collapse, Box, styled } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { mainMenu } from '../JsonFiles/MainMenu';
import { Link as RouterLink } from 'react-router-dom';

const MenuItem = styled(ListItem)(({ theme }) => ({
    cursor: 'pointer',
    color:'grey',
    '&:hover': {
      backgroundColor: theme.palette.grey[100], // change background color on hover
      color: theme.palette.primary.main,
    },
  }));

const MainMenu = () => {   

  const [open, setOpen] = useState({});
  const navBarRef = useRef(null);

  const handleClick = (index) => {
    // setOpen({ ...open, [index]: !open[index] });
    setOpen({ [index]: !open[index] });
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


  return (
    <>

      <List ref={navBarRef} sx={{display:'flex', px:3, mb:1, width:'100%', position:'relative'}} disablePadding >
        {mainMenu.map((menuItem) => (
          <Box key={menuItem.name} sx={{bgcolor:'background.header'}}>
            <MenuItem sx={{ px:0}} button  component={RouterLink} to={menuItem.href} onMouseEnter={() => handleClick(menuItem.name)} >
                <Box sx={{
                    borderRight: menuItem.name === "Public Hearing"?"":'1px solid grey', 
                    display:'flex', 
                    px:2, 
                    width:'100%'
                    }} >
                        {/* <Typography sx={{ textDecoration:open[menuItem.name]?'underline' :"", textUnderlineOffset:'5px', color:open[menuItem.name]?'primary.main':"", fontWeight:'bold', textDecorationThickness:'2px'}} >  */}
                        <Box component='div' sx={{ color:open[menuItem.name]?'primary.main':"", fontWeight:'bold'}} > 
                        {menuItem.name}
                        {
                            open[menuItem.name]?
                            <div style={{width:"40%", height:'3px',backgroundColor:'#155693'}} ></div>
                            : <div style={{height:'3px'}} ></div>
                        }
                         </Box>
                        {menuItem.subItems && (open[menuItem.name] ? <ExpandLess  sx={{ml:1, color:open[menuItem.name]?'primary.main':""}} /> : <ExpandMore sx={{ml:1}} />)}
                </Box>
            </MenuItem>
            {menuItem.subItems && (
              <Collapse in={open[menuItem.name]} timeout="auto" unmountOnExit sx={{position:'absolute', top:'105%', zIndex:'500', bgcolor:'secondary.navbar'}} >
              {/* <Collapse in={open[menuItem.name]} timeout="auto" unmountOnExit sx={{position:'absolute', top:'100%', zIndex:'500', bgcolor:'background.header'}} > */}
              {/* <Collapse > */}
                <List component="div" disablePadding >
                  {menuItem.subItems.map((subItem) => (
                    <ListItem key={subItem.name} button component={RouterLink} to={subItem.href} sx={{ bgcolor:''}}  >
                        <ListItemText primary={subItem.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>

    </>
  );
}

export default MainMenu