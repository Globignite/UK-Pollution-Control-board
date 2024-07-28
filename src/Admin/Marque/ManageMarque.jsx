import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Spinner from "../../publicView/Components/Spinner";
import { toast } from "sonner";

const ManageMarquee = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const [open, setOpen] = useState(false);
  const [selectedMarquee, setSelectedMarquee] = useState(null);
 
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] = useState(0);
 

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://delightfulbroadband.com/api/marquee",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch notifications");
      }

      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://delightfulbroadband.com/api/marquee/${selectedMarquee.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete marquee");
      }
      toast.success("Marquee deleted successfully", { duration: 3000 });
      fetchNotifications(); // Refresh the notifications after deletion
    } catch (error) {
      console.error("Error deleting marquee:", error);
      toast.error("Error deleting marquee. Please try again later.", { duration: 3000 });
    }
    setLoading(false);
  };

  const handleOpenDialog = (id, name) => {
    setSelectedMarquee({ id, name });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMarquee(null);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container>
      <Spinner loading={loading} />
      <Typography variant="h6" gutterBottom>
        Manage Marquee
      </Typography>

      {notifications.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No Records
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ width: "60vw" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Publish Date</TableCell>
                <TableCell>File Type</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
 
                    <Link href={`https://delightfulbroadband.com${file?.file_data?.href}`} target="_blank">
                      {file?.marquee_title || "N/A"}
 
                    </Link>
                  </TableCell>
                  <TableCell>{file?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                  <TableCell>{file?.file_data?.type || "N/A"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(file?._id, file?.marquee_title)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {selectedMarquee?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageMarquee;
