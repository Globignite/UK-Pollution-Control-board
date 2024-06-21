import { useState, useEffect, useRef } from 'react';
import { List, ListItem, Link, Collapse, Box, styled } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { mainMenu } from '../JsonFiles/MainMenu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const MenuItem = styled(ListItem)(({ theme }) => ({
    cursor: 'pointer',
    color: 'grey',
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.primary.main,
    },
}));

const MainMenu = () => {
    const [open, setOpen] = useState({});
    const [openSub, setOpenSub] = useState({});
    const [toggle, setToggle] = useState({});
    const [mobileView, setMobileView] = useState(window.innerWidth <= 1199);
    const [toggleNav, setToggleNav] = useState(false);
    const navBarRef = useRef(null);

    const location = useLocation();

    const handleClickHover = (index) => {
        if (!mobileView) {
            setOpen((prevOpen) => {
                const newOpen = { [index]: true };
                Object.keys(prevOpen).forEach((key) => {
                    if (key !== index) newOpen[key] = false;
                });
                return newOpen;
            });
        }
    };

    const handleClick = (index) => {
        setToggle((prevToggle) => ({ ...prevToggle, [index]: !prevToggle[index] }));
    };

    const handleNavOpen = () => {
        setToggleNav(true);
    };

    const handleNavClose = () => {
        setToggleNav(false);
    };

    const handleClickSub = (index) => {
        setOpenSub((prevOpenSub) => ({ ...prevOpenSub, [index]: !prevOpenSub[index] }));
    };

    const handleClickLeave = (index) => {
        if (!mobileView) {
            setOpen((prevOpen) => ({ ...prevOpen, [index]: false }));
        }
    };

    const adjustPosition = (event, menuItem) => {
        if (!mobileView && open[menuItem.name]) {
            const menuItemElement = event.target.closest('.MuiListItem-root');
            const submenuElement = menuItemElement.querySelector('.submenu');

            if (submenuElement) {
                const rect = submenuElement.getBoundingClientRect();
                if (rect.right > window.innerWidth) {
                    submenuElement.style.left = `-${rect.width}px`;
                } else {
                    submenuElement.style.left = '100%';
                }
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth <= 1199);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        handleNavClose();
        window.scrollTo(0, 0);
    }, [location]);

    const isActive = (href) => {
        if(location.pathname === '/'){
            return href === '/' && location.pathname === '/';
        }
        return location.pathname.substring(1,location.pathname.length-1).startsWith(href);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    position: { lg: 'relative', xs: 'fixed' },
                    transition: 'all 0.5s linear',
                    left: { lg: '0%', xs: toggleNav ? '0%' : '100%' },
                    top: '0%',
                    height: { lg: '100%', xs: '100vh' },
                    zIndex: 1010,
                }}
            >
                <Box
                    sx={{ display: { lg: 'none', xs: 'flex' }, width: { lg: '0%', md: '50%', xs: '40%' }, bgcolor: 'rgba(0,0,0,0.2)' }}
                    onClick={handleNavClose}
                ></Box>
                <List
                    ref={navBarRef}
                    sx={{
                        display: 'flex',
                        position: { lg: 'relative' },
                        bgcolor: 'background.header',
                        flexDirection: { lg: 'row', xs: 'column' },
                        justifyContent: { lg: 'center', xs: 'start' },
                        mb: 1,
                        width: '100%',
                        fontSize: '0.9rem',
                        py: { lg: 0, xs: 5 },
                        overflowY: mobileView ? 'auto' : ''
                    }}
                    disablePadding
                >
                    {mainMenu.map((menuItem) => (
                        <Box key={menuItem.name} sx={{ bgcolor: 'background.header' }}>
                            <MenuItem
                                sx={{ px: 0 }}
                                onMouseEnter={(e) => {
                                    handleClickHover(menuItem.name);
                                    adjustPosition(e, menuItem);
                                }}
                                onMouseLeave={() => handleClickLeave(menuItem.name)}
                            >
                                <Box
                                    sx={{
                                        borderRight: menuItem.name === 'Contact Us' ? '' : mobileView ? '' : '1px solid grey',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        px: 2,
                                        height:'100%',
                                        width: '100%',
                                    }}
                                >
                                    <Link
                                        component={RouterLink}
                                        to={menuItem.href}
                                        sx={{
                                            color: isActive(menuItem.href.substring(1,menuItem.href.length-1)) ? 'primary.main' : '#000',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {menuItem.name}
                                        <div style={{ width: '100%', height: '3px', backgroundColor: isActive(menuItem.href.substring(1,menuItem.href.length-1)) ? '#155693' : 'transparent' }}></div>
                                    </Link>
                                    {menuItem.subItems &&
                                        (mobileView ? (
                                            toggle[menuItem.name] ? (
                                                <ExpandLess onClick={() => handleClick(menuItem.name)} sx={{ ml: 1, color: open[menuItem.name] ? 'primary.main' : '' }} />
                                            ) : (
                                                <ExpandMore sx={{ ml: 1 }} onClick={() => handleClick(menuItem.name)} />
                                            )
                                        ) : open[menuItem.name] ? (
                                            <ExpandLess sx={{ ml: 1, color: open[menuItem.name] ? 'primary.main' : '' }} />
                                        ) : (
                                            <ExpandMore sx={{ ml: 1 }} />
                                        ))}
                                </Box>
                            </MenuItem>
                            {menuItem.subItems && (
                                <>
                                    {mobileView ? (
                                        <Collapse in={toggle[menuItem.name]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {menuItem.subItems.map((subItem) => (
                                                    <ListItem key={subItem.name} button sx={{ pl: 3 }}>
                                                        <div key={subItem.name} style={{ width: '100%' }}>
                                                            {subItem?.subItems ? (
                                                                <ListItem
                                                                    key={subItem.name}
                                                                    sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                                                                    button
                                                                >
                                                                    <Link
                                                                        component={RouterLink}
                                                                        to={subItem.href}
                                                                        variant="body1"
                                                                        sx={{
                                                                            width: '100%',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            color: isActive(subItem.href.substring(1,subItem.href.length-1)) ? 'primary.main' : '#000',
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
                                                                <ListItem key={subItem.name} button>
                                                                    <Link
                                                                        component={RouterLink}
                                                                        to={subItem.href}
                                                                        variant="body1"
                                                                        sx={{
                                                                            width: '100%',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            color: isActive(subItem.href.substring(1,subItem.href.length-1)) ? 'primary.main' : '#000',
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
                                                                            <ListItem key={nestedSubItem.name} sx={{ pl: 5 }} button>
                                                                                <Link
                                                                                    component={RouterLink}
                                                                                    to={nestedSubItem.href}
                                                                                    variant="body1"
                                                                                    sx={{
                                                                                        width: '100%',
                                                                                        display: 'flex',
                                                                                        justifyContent: 'space-between',
                                                                                        color: isActive(nestedSubItem.href.substring(1,nestedSubItem.href.length-1)) ? 'primary.main' : '#000',
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
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    ) : (
                                        <Collapse
                                            in={open[menuItem.name]}
                                            timeout="auto"
                                            unmountOnExit
                                            sx={{ position: 'absolute', top: '105%', zIndex: '500', bgcolor: 'secondary.navbar', minWidth: '150px' }}
                                            className="submenu"
                                            onMouseEnter={() => handleClickHover(menuItem.name)}
                                            onMouseLeave={() => handleClickLeave(menuItem.name)}
                                        >
                                            <List component="div" sx={{ position: 'relative' }} disablePadding>
                                                {menuItem.subItems.map((subItem) => (
                                                    <ListItem key={subItem.name} button>
                                                        <div key={subItem.name} style={{ width: '100%' }}>
                                                            {subItem?.subItems ? (
                                                                <ListItem key={subItem.name} button>
                                                                    <Link
                                                                        component={RouterLink}
                                                                        to={subItem.href}
                                                                        variant="body1"
                                                                        sx={{
                                                                            width: '100%',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            py: 0,
                                                                            color: isActive(subItem.href) ? 'primary.main' : '#000',
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
                                                                            <KeyboardArrowRightIcon onClick={() => handleClickSub(subItem.name)} />
                                                                        ) : (
                                                                            <KeyboardArrowRightIcon onClick={() => handleClickSub(subItem.name)} />
                                                                        ))}
                                                                </ListItem>
                                                            ) : (
                                                                <ListItem key={subItem.name} button>
                                                                    <Link
                                                                        component={RouterLink}
                                                                        to={subItem.href}
                                                                        variant="body1"
                                                                        sx={{
                                                                            width: '100%',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            py: 0,
                                                                            color: isActive(subItem.href) ? 'primary.main' : '#000',
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
                                                                <Collapse
                                                                    in={openSub[subItem.name]}
                                                                    sx={{ position: 'absolute', left: '101%', bgcolor: 'secondary.navbar', width: '100%', top: '1%' }}
                                                                    timeout="auto"
                                                                    unmountOnExit
                                                                    onMouseEnter={() => handleClickHover(menuItem.name)}
                                                                    onMouseLeave={() => handleClickLeave(menuItem.name)}
                                                                >
                                                                    <List component="div" disablePadding>
                                                                        {subItem.subItems.map((nestedSubItem) => (
                                                                            <ListItem key={nestedSubItem.name} sx={{ pl: 5 }} button>
                                                                                <Link
                                                                                    component={RouterLink}
                                                                                    to={nestedSubItem.href}
                                                                                    variant="body1"
                                                                                    sx={{
                                                                                        width: '100%',
                                                                                        display: 'flex',
                                                                                        justifyContent: 'space-between',
                                                                                        color: isActive(nestedSubItem.href) ? 'primary.main' : '#000',
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
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    )}
                                </>
                            )}
                        </Box>
                    ))}
                </List>
            </Box>
            <Box sx={{ bgcolor: '', width: '100%', display: { xs: 'flex', lg: 'none' }, justifyContent: 'space-between', px: 1, py: 2 }}>
                <Box sx={{ position: 'relative' }}>
                    <SearchIcon sx={{ position: 'absolute', top: '5px', left: '5px', color: 'grey' }} />
                    <input type="search" />
                </Box>
                <MenuIcon sx={{ color: 'secondary.main' }} onClick={handleNavOpen} />
            </Box>
        </>
    );
};

export default MainMenu;
