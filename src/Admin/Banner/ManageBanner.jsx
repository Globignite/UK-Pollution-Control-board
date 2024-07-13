import React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ManageBanner() {
  const imageUrls = [
    // Add the URLs of the images you want to display here
    "https://via.placeholder.com/600x200",
    "https://via.placeholder.com/600x200",
    "https://via.placeholder.com/600x200",
  ];

  return (
    <>
      <h3>Manage Banner</h3>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {imageUrls.map((url, index) => (
          <Box
            key={index}
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
              src={url}
              alt={`Banner ${index + 1}`}
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
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );

  function handleDelete(index) {
    console.log("Delete image at index:", index);
    // Implement the delete functionality here
  }
}

export default ManageBanner;
