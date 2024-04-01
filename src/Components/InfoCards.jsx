import { Card, CardContent, Typography } from '@mui/material';

const InfoCards = () => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Covid 19 Bio medical waste management at health care facility
        </Typography>
        {/* Add additional content or styling here */}
      </CardContent>
    </Card>
  );
};

export default InfoCards;
