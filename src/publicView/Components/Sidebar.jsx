import { useState, useEffect } from 'react';
import { List, ListItem, Link, Collapse, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SideMenu } from '../JsonFiles/SideMenu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Sidebar() {
  const [open, setOpen] = useState({});
  const [openSub, setOpenSub] = useState({});
  const [toggleNav, setToggleNav] = useState(false);
  const location = useLocation();

  const handleClick = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const handleClickSub = (index) => {
    setOpenSub({ ...openSub, [index]: !openSub[index] });
  };

  const handleNavOpen = () => {
    setToggleNav(true);
  };

  const handleNavClose = () => {
    setToggleNav(false);
  };

  useEffect(() => {
    handleNavClose();
  }, [location]);

  const isActive = (href) => {
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          position: { lg: 'relative', xs: 'fixed' },
          transition: 'all 0.5s linear',
          left: { lg: '0%', xs: toggleNav ? '0%' : '-100%' },
          top: '0%',
          zIndex: 1000,
        }}
      >
        <List
          sx={{
            display: 'block',
            width: { lg: '100%', md: '70%', xs: '80%' },
            bgcolor: 'background.header',
            height: { lg: '100%', xs: '100dvh' },
            overflow: { lg: 'hidden', xs: 'scroll' },
            py: 5,
          }}
        >
          {SideMenu.menu.map((menuItem) => (
            <Box key={menuItem.name}>
              <ListItem
                sx={{
                  borderBottom: '1px solid #EEEEEE',
                  cursor: 'pointer',
                  bgcolor: isActive(menuItem.href) ? 'primary.main' : 'background.header',
                  '&:hover': {
                    bgcolor: isActive(menuItem.href) ? 'primary.main' : 'grey.300',
                    // color: isActive(menuItem.href) ? 'grey.300' : 'primary.main',
                  },
                }}
                button
              >
                <Link
                  component={RouterLink}
                  to={menuItem.href}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: { lg: '1.2rem' },
                    color: isActive(menuItem.href) ? '#fff' : 'primary.main',
                  }}
                  underline="none"
                >
                  {menuItem.name}
                </Link>
                {menuItem.subItems &&
                  (open[menuItem.name] ? (
                    <ExpandLess
                      sx={{ color: isActive(menuItem.href) ? '#fff' : 'primary.main' }}
                      onMouseEnter={(e) => {
                        if (isActive(menuItem.href)) e.target.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        if (isActive(menuItem.href)) e.target.style.color = '#fff';
                      }}
                      onClick={() => handleClick(menuItem.name)}
                    />
                  ) : (
                    <ExpandMore
                      sx={{ color: isActive(menuItem.href) ? '#fff' : 'primary.main' }}
                      onMouseEnter={(e) => {
                        if (isActive(menuItem.href)) e.target.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        if (isActive(menuItem.href)) e.target.style.color = '#fff';
                      }}
                      onClick={() => handleClick(menuItem.name)}
                    />
                  ))}
              </ListItem>
              {menuItem.subItems && (
                <Collapse in={open[menuItem.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.subItems.map((subItem) => (
                      <div key={subItem.name}>
                        {subItem?.subItems ? (
                          <ListItem key={subItem.name} sx={{ pl: 5 }} button>
                            <Link
                              component={RouterLink}
                              to={subItem.href}
                              variant="body1"
                              sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: isActive(subItem.href) ? 'primary.main' : 'error.main',
                                '&:hover': {
                                  color: 'primary.dark',
                                },
                              }}
                              underline="none"
                            >
                              {subItem.name}
                            </Link>
                            {subItem.subItems &&
                              (openSub[subItem.name] ? (
                                <ExpandLess onClick={() => handleClickSub(subItem.name)} />
                              ) : (
                                <ExpandMore onClick={() => handleClickSub(subItem.name)} />
                              ))}
                          </ListItem>
                        ) : (
                          <ListItem key={subItem.name} sx={{ pl: 5 }} button>
                            <Link
                              component={RouterLink}
                              to={subItem.href}
                              variant="body1"
                              sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: isActive(subItem.href) ? 'primary.main' : 'error.main',
                                '&:hover': {
                                  color: 'primary.dark',
                                },
                              }}
                              underline="none"
                            >
                              {subItem.name}
                            </Link>
                          </ListItem>
                        )}
                        {subItem?.subItems && (
                          <Collapse in={openSub[subItem.name]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {subItem.subItems.map((nestedSubItem) => (
                                <ListItem key={nestedSubItem.name} sx={{ pl: 8 }} button>
                                  <Link
                                    component={RouterLink}
                                    to={nestedSubItem.href}
                                    variant="body1"
                                    sx={{
                                      width: '100%',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      color: isActive(nestedSubItem.href) ? 'primary.main' : 'error.main',
                                      '&:hover': {
                                        color: 'primary.dark',
                                      },
                                    }}
                                    underline="none"
                                  >
                                    {nestedSubItem.name}
                                  </Link>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        )}
                      </div>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
        <Box
          sx={{
            display: { lg: 'none', xs: 'flex' },
            width: { lg: '0%', md: '30%', xs: '20%' },
            bgcolor: 'rgba(0,0,0,0.2)',
          }}
          onClick={handleNavClose}
        ></Box>
      </Box>
      <Box
        sx={{
          display: { lg: 'none', xs: toggleNav ? 'none' : 'flex' },
          justifyContent: 'center',
          alignItems: 'start',
          py: 5,
          position: 'fixed',
          width: '30px',
          height: '100%',
          left: '0px',
          top: '40%',
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            transform: 'rotate(-90deg)',
            shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '150px',
            py: 0.5,
            pl: 1,
            bgcolor: 'background.footer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: '0px 0px 5px 5px',
          }}
          onClick={handleNavOpen}
        >
          MENU
          <KeyboardArrowDownIcon sx={{ p: 0, m: 0 }} />
        </Box>
      </Box>
    </>
  );
}
