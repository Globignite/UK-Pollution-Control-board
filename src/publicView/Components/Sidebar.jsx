import * as React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // Sample structure, repeat for other items
  return (
    <List component="nav">
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Quality Standards" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText inset primary="Sub-item 1" />
          </ListItem>
          {/* Repeat ListItem for other sub-items */}
        </List>
      </Collapse>
      {/* Repeat for other main items */}
    </List>
  );
}
