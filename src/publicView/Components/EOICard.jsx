import { Card, CardContent, Typography } from '@mui/material';

const EOICard = () => {
  return (
    <Card sx={{ minWidth: 275, marginY: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Expression Of Interest (EOI)
        </Typography>
        {/* Add additional content or styling here */}
      </CardContent>
    </Card>
  );
};

export default EOICard;
