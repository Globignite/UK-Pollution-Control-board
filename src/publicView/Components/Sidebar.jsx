import * as React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SideMenu } from '../JsonFiles/SideMenu';


export default function Sidebar() {

  const [open, setOpen] = React.useState({});
  const [openSub, setOpenSub] = React.useState({});

  const handleClick = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const handleClickSub = (index) => {
    setOpenSub({ ...openSub, [index]: !openSub[index] });
  };

  // console.log(SideMenu.menu)

  // Sample structure, repeat for other items
  return (
    <>

      <List>
        {SideMenu.menu.map((menuItem, index) => (
          <div key={index}>
            <ListItem button sx={{borderBottom:'1px solid #EEEEEE'}}  onClick={() => handleClick(index)}>
              <ListItemText primary={menuItem.name} />
              {menuItem.subItems && (open[index] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {menuItem.subItems && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menuItem.subItems.map((subItem) => (
                    <>
                    {
                      subItem?.subItems ?
                        <ListItem key={subItem.name} sx={{pl:5}}  button onClick={() => handleClickSub(index)}>
                          <ListItemText primary={subItem.name} />
                          {subItem.subItems && (openSub[index] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        :
                        <ListItem key={subItem.name} sx={{pl:5}}  button component="a" href={subItem.href} onClick={() => handleClickSub(index)}>
                          <ListItemText primary={subItem.name} />
                          {subItem.subItems && (openSub[index] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>

                    }
                    {
                      subItem?.subItems && (
                        <Collapse in={openSub[index]} timeout="auto" unmountOnExit >
                          <List component="div" disablePadding > 
                            {
                              subItem.subItems.map((subItem) => (
                                <>
                                  <ListItem key={subItem.name} sx={{pl:8}} button component="a" href={subItem.href}>
                                    <ListItemText primary={subItem.name} />
                                  </ListItem>
                                </>
                              ))
                            }
                          </List>
                        </Collapse>
                      )
                    }
                    </> 
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>




    {/* <List component="nav">
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Quality Standards" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText inset primary="Sub-item 1" />
          </ListItem>

        </List>
      </Collapse>

    </List> */}
    </>
  );
}
