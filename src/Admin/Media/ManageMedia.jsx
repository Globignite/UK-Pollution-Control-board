import {
  Container,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../publicView/Components/Spinner";
import { toast } from "sonner";

function ManageMedia() {
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  const fetchMedia = async (startDate, endDate, searchTerm, pageNo) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://delightfulbroadband.com/api/media/fetch-media",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            event_name: searchTerm,
            startDate,
            endDate,
            page: pageNo,
            limit: 10,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log("Media Data:", response?.data.data);
      setMedia(response?.data.data);
      setPaginationData(pagination);
      console.log("Pagination Info:", pagination);
    } catch (error) {
      console.error(
        "Error fetching media:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
    setLoading(false);
  };

  const setPage = (page) => {
    setPageNo(page);
    fetchMedia(startDate, endDate, searchTerm, page);
  };

  useEffect(() => {
    fetchMedia(startDate, endDate, searchTerm, pageNo);
  }, [pageNo]);

  const handleFilterClick = () => {
    setPageNo(1);
    fetchMedia(startDate, endDate, searchTerm, 1);
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setPageNo(1);
    fetchMedia(startDate, endDate, searchTerm, 1);
  };

  const openDeleteDialog = (media) => {
    setMediaToDelete(media);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setMediaToDelete(null);
    setOpenDialog(false);
  };

  const deleteEvent = async () => {
    setLoading(true);
    setOpenDialog(false);
    const id = mediaToDelete._id;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        "https://delightfulbroadband.com/api/media/delete-media-event",
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
      fetchMedia(startDate, endDate, searchTerm, pageNo);
      toast.success("Media deleted successfully");
    } catch (error) {
      console.error("Error deleting Event:", error);
      toast.error(error.response?.data?.error || "Oops, something went wrong");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Spinner loading={loading} />
      <Typography variant="h6" gutterBottom>
        Manage Media
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        marginBottom={2}
      >
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
          variant="outlined"
          placeholder="Search Event Name"
          style={{ flex: 1 }}
        />

        <TextField
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          label="Start Date"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
        <TextField
          type="date"
          value={endDate}
          margin="normal"
          onChange={(e) => handleDateChange("end", e.target.value)}
          label="End Date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1 }}
        />
        <Button
          variant="contained"
          style={{ alignSelf: "center" }}
          onClick={handleFilterClick}
        >
          Search
        </Button>
      </Box>
      {media.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No Media Event Record
        </Typography>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Media Events
          </Typography>
          {media.map((item) => (
            <Box
              key={item.id}
              marginBottom={2}
              padding={2}
              boxShadow={2}
              borderRadius={2}
              sx={{ position: "relative" }}
            >
              <Typography variant="h6" marginBottom={1}>
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                marginBottom={1}
                sx={{ fontWeight: "semibold" }}
              >
                {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                marginBottom={1}
                sx={{ fontWeight: "semibold" }}
              >
                {item.description}
              </Typography>

              <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {item?.data.length > 0 ? (
                  item?.data.map((ele, index) => (
                    <Grid
                      item
                      xs={2}
                      sm={2}
                      md={2}
                      key={ele?._id}
                      marginRight={2}
                      sx={{ position: "relative" }}
                    >
                      <Box>
                        <img
                          src={`https://delightfulbroadband.com${ele.href}`}
                          alt={`Media Event ${index + 1}`}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2">No data</Typography>
                )}
              </Grid>

              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                onClick={() => openDeleteDialog(item)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <Box>
        {paginationData.totalPages > 1 && (
          <Pagination
            pagination={paginationData}
            setPageNo={setPage}
            pageNo={pageNo}
          />
        )}
      </Box>

      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this media event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteEvent} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageMedia;
