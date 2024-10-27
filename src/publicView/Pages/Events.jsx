import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Button, 
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import axios from "axios";
import { Link } from "react-router-dom";

function Events() {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedia();
  }, [page]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_MEDIA_URL}/fetch-media`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: page,
            limit: 6,
          },
        }
      );
      console.log(response);  
      setMedia(response?.data?.data);
      setHasMore(response.data.pagination.hasNextPage);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_MEDIA_URL}/fetch-media`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            event_name: search,
          },
        }
      );
      setMedia(response?.data?.data);
      setHasMore(response?.data?.pagination?.hasNextPage);
    } catch (error) {
      console.error("Error fetching media:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          my: 2,
          mx: 1,
          fontWeight: "600",
          fontSize: { lg: "1.8rem", xs: "1rem" },
          color: "primary.main",
        }}
      >
        Events
      </Typography>

      <Stack spacing={2} direction="row" sx={{ mt: 2 }} >
        <Box sx={{ display: "flex", gap: "6px" }}>
          <Box sx={{ position: "relative" }} style={{ margin: '5px' }}>
            <SearchIcon sx={{ position: "absolute", top: "5px", left: "5px", color: "grey" }} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "30px", borderRadius: "4px", border: "1px solid #ddd", width: "200px" }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={fetchMediaSearch}
            sx={{ bgcolor: "secondary.main", textTransform: "none", borderRadius: 2, ":hover": { backgroundColor: "secondary.light" } }}
          >
            Search
          </Button>
        </Box>
      </Stack>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {media?.length ? (
          media.map((event, index) => (
            <Grid item xs={1} sm={4} md={4} key={index}>
              <Link to={`/media/event-gallery/${event._id}`}>
                <Box sx={{ margin: "20px 0px", borderRadius: "8px" }}>  
                  {event.data[0].type === "Photo" ? (
                    <img
                      src={`https://delightfulbroadband.com${event?.data[0]?.href}`}
                      alt={event?.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <video
                      src={`https://delightfulbroadband.com${event?.data[0]?.href}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                     
                    />
                  )}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ my: 2, mx: 1, fontWeight: "600", fontSize: "1.3rem", color: "primary.main" }}>
                      {event.name}
                    </Typography>
                    <ArrowOutwardIcon sx={{ color: "#155693" }} />
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))
        ) : (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography>No results found</Typography>
          </Box>
        )}
      </Grid>

      {loading && (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <CircularProgress />
        </Box>
      )}

      {hasMore && !loading && (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Events;

