import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const NoticesAndUpdates = () => {
  // Sample data array, replace with your actual data
  const notices = ['Notice 1', 'Notice 2'];
  const updates = ['Update 1', 'Update 2'];

  return (
    <Box padding={2}>
      <Typography variant="h6">Notices</Typography>
      <List>
        {notices.map((notice, index) => (
          <ListItem key={index}>
            <ListItemText primary={notice} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>Recent Updates</Typography>
      <List>
        {updates.map((update, index) => (
          <ListItem key={index}>
            <ListItemText primary={update} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NoticesAndUpdates;
