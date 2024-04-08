import { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Link } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SideMenu } from '../JsonFiles/SideMenu';
import { Link as RouterLink } from 'react-router-dom';


export default function Sidebar() {

  const [open, setOpen] = useState({});
  const [openSub, setOpenSub] = useState({});

  const handleClick = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const handleClickSub = (index) => {
    setOpenSub({ ...openSub, [index]: !openSub[index] });
  };

  return (
    <>

      <List>
        {SideMenu.menu.map((menuItem) => (
          <div key={menuItem.name}>
            <ListItem sx={{borderBottom:'1px solid #EEEEEE', cursor:'pointer'}} button  >
              {/* <ListItemText primary={menuItem.name}  /> */}
              <Link
              component={RouterLink}
              to={menuItem.href}
              variant="body1"
              color="textPrimary"
              sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
              underline="none"
            >
              {menuItem.name}
            </Link>
              {menuItem.subItems && (open[menuItem.name] ? <ExpandLess  onClick={() => handleClick(menuItem.name)} /> : <ExpandMore  onClick={() => handleClick(menuItem.name)} />)}
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
                            color="textPrimary"
                            sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
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
                            color="textPrimary"
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
                                      color="textPrimary"
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
          </div>
        ))}
      </List>

    </>
  );
}
