import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";

const NotFoundPage = (props) => {
  const goBack = () => {
    props.history.goBack();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The page you are looking for might have been removed,
        <br />
        had its name changed or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={goBack}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </Box>
  );
};

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
};

export default NotFoundPage;
