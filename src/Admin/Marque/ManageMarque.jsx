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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ManageMarquee = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("https://delightfulbroadband.com/api/marquee", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch notifications");
      }

      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `https://delightfulbroadband.com/api/marquee/${id}`,
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
        alert("Marquee deleted successfully");
        fetchNotifications(); // Refresh the notifications after deletion
      } catch (error) {
        console.error("Error deleting marquee:", error);
        alert("Error deleting marquee. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container>
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
                    <Link href={`https://delightfulbroadband.com${file.file_data.href}`} target="_blank">
                      {file.marquee_title || "N/A"}
                    </Link>
                  </TableCell>
                  <TableCell>{file.createdAt.split("T")[0] || "N/A"}</TableCell>
                  <TableCell>{file.file_data.type || "N/A"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleDelete(file._id, file.marquee_title)}
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
    </Container>
  );
};

export default ManageMarquee;
