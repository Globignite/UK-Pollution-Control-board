import {useEffect, useState} from "react";
import { Typography,Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function ManageBanner() {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () =>{
    try {
      const response = await axios.get("https://delightfulbroadband.com/api/banner/fetch-banner");
      console.log("Success:", response.data.data);
      setBanners(response.data.data)
    } catch (error) {
      console.error("Error uploading media:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
  }

  const deleteBanner = async (id) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.delete("https://delightfulbroadband.com/api/banner/delete-banner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          _id: id
        }
      });
      console.log("Success:", response);
      alert("Banner Deleted successfully");
      fetchBanners();
    } catch (error) {
      console.error("Error deleting Banner:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
  }


  useEffect(() => {
    fetchBanners()
  }, []);

  return (
    <Box sx={{pl:2}}>
       <Typography variant="h6" gutterBottom>
       Manage Banner
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {banners?.length > 0 ?
        
        banners?.map((ele, index) => (
          <Box
            key={ele?._id}
            sx={{
              position: "relative",
              width: 600,
              height: 200,
              border: "1px solid #ccc",
              borderRadius: 1,
              overflow: "hidden",
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
          </Box>
        ))
          : 
          <p>No data</p>
      }
      </Box>
    </Box>
  );
}

export default ManageBanner;
