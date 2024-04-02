import { Box, Button, Stack } from '@mui/material';

const QuickLinks = () => {
  // Sample data array, replace with your actual data
  const links = ['News', 'Recruitments', 'Tenders', 'Court/Tribunal-Judgements Orders'];

  return (
    <Box bgcolor="primary.main" color="primary.contrastText" padding={2}>
      <Stack direction="row" spacing={2}>
        {links.map((link, index) => (
          <Button key={index} variant="contained">
            {link}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default QuickLinks;
