import { useEffect, useState } from "react";
import { Typography, Box, Grid, IconButton, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Spinner from "../../publicView/Components/Spinner";

function ManageBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        "https://delightfulbroadband.com/api/banner/fetch-banner"
      );
      console.log("Success:", response.data.data);
      setBanners(response.data.data);
    } catch (error) {
      console.error("Error uploading media:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
  };

  const deleteBanner = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.delete(
        "https://delightfulbroadband.com/api/banner/delete-banner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            _id: id,
          },
        }
      );
      console.log("Success:", response);
      alert("Banner Deleted successfully");
      fetchBanners();
    } catch (error) {
      console.error("Error deleting Banner:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <Container>
      <Spinner loading={loading} />
      <Typography variant="h6" gutterBottom>
        Manage Banner
      </Typography>

      <Grid container gap={3}>
        {banners?.length > 0 ? (
          banners?.map((ele, index) => (
            <Grid
              item
              key={ele?._id}
              sx={{
                position: "relative",
                border: "1px solid #ccc",
                borderRadius: 1,
                overflow: "hidden",
              }}
              style={{
                width: "32vw",
                height: "200px",
              }}
            >
              <img
                src={`https://delightfulbroadband.com${ele.href}`}
                alt={`Banner ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                onClick={() => deleteBanner(ele._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          ))
        ) : (
          <p>No data</p>
        )}
      </Grid>
    </Container>
  );
}

export default ManageBanner;
