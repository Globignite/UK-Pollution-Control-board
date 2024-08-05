import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Spinner from "../../publicView/Components/Spinner";
import { toast } from "sonner";

function ManageBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  const handleDeleteClick = (id) => {
    setBannerToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBannerToDelete(null);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;
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
            _id: bannerToDelete,
          },
        }
      );
      console.log("Success:", response);
      toast.success("Banner Deleted successfully", { duration: 3000 });
      fetchBanners();
    } catch (error) {
      console.error("Error deleting Banner:", error);
      toast.error(error.response?.data?.error || "Oops, something went wrong", { duration: 3000 });
    }
    setLoading(false);
    handleClose();
  };

  const handleImageClickOpen = (image) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

  const handleImageClose = () => {
    setOpenImageDialog(false);
    setSelectedImage("");
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
              onClick={() => handleImageClickOpen(`https://delightfulbroadband.com${ele.href}`)}
            >
              <img
                src={`https://delightfulbroadband.com${ele.href}`}
                alt={`Banner ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer"
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(ele._id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          ))
        ) : (
          <p>No data</p>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this banner? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openImageDialog} onClose={handleImageClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleImageClose}
            sx={{
              position: 'absolute',
              right: 3,
              top: 2,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ManageBanner;
