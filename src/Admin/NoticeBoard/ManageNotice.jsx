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
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GetMenu from "../Components/GetMenu";
import axios from "axios";

const files = [
  { name: "Quality Standards - Industry...",type:"pdf", date: "03/12/2023" },
  { name: "User Manual - For industries & Unit...",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
  { name: "Chakra Soft UI Version",type:"pdf", date: "03/12/2023" },
];

const ManageNotice = () => {
  const [notifications,setNotifications]= useState([]);

 


  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://delightfulbroadband.com/api/notifications/fetch-notifications",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Notifications:", response.data);
      setNotifications(response?.data?.data); // Assuming response.data is an array of notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Handle error state if needed
    }
  };

  
  const handledelete = async (_id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        "https://delightfulbroadband.com/api/notifications/delete-notification",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            _id: _id,
          },
        }
      );
      console.log("Notification deleted:", response.data);
      // setNotifications((prevNotifications) =>
      //   prevNotifications.filter((notification) => notification._id !== _id)
      // );
      alert("Notification deleted successfully"); 
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert(error.response?.data?.error || "Oops, something went wrong");
    }
  };

  useEffect(() => {
  fetchNotifications();
  }, [notifications]);

  return (
    <Container >
      <Typography variant="h6" gutterBottom>
        Manage Notices
      </Typography>
      {/* component for getting menu and sub menu  */}
      <GetMenu /> 
      <TableContainer component={Paper} style={{width:'60vw'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Publish Date
              </TableCell>
              <TableCell>Module
              </TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((file, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href="#">{file?.title || 'N/A'}</Link>
                </TableCell>
                <TableCell>{file.Publish_Date || 'N/A'}</TableCell>
 <TableCell>{file.Module || 'N/A'}</TableCell>
                <TableCell>{file.files[0].type}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() =>handledelete(file?._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageNotice;
