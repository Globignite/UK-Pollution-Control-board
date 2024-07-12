import { Grid, Typography, Box, Stack, Button, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Playlist = [
  {
    Eventid: "EVN001",
    Eventname: "Worlds day",
    Eventimage:
      "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    Eventid: "EVN002",
    Eventname: "DNK",
    Eventimage:
      "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    Eventid: "EVN003",
    Eventname: "LNKFNL",
    Eventimage:
      "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    Eventid: "EVN004",
    Eventname: "Worlds day",
    Eventimage:
      "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    Eventid: "EVN005",
    Eventname: "DNK",
    Eventimage:
      "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    Eventid: "EVN006",
    Eventname: "LNKFNL",
    Eventimage:
      "https://images.unsplash.com/photo-1719336234156-320dafbac51a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Events() {
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

      <Stack spacing={2} direction="row" sx={{ my: 2 }}>
        <Box sx={{ position: "relative", display: { lg: "flex", xs: "none" } }}>
          <SearchIcon
            sx={{
              position: "absolute",
              top: "5px",
              left: "5px",
              color: "grey",
            }}
          />
          <input type="search" />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "secondary.main",
            textTransform: "none",
            borderRadius: 2,
            ":hover": { backgroundColor: "secondary.light" },
          }}
        >
          {" "}
          Search
        </Button>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Playlist.slice(0, 6).map((event, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Link to={`/media/event-gallery/${event.Eventid}`}>
              <Box>
                <img
                  src={event.Eventimage}
                  alt={event.Eventname}
                  style={{ width: "100%", height: "auto" }}
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      my: 2,
                      mx: 1,
                      fontWeight: "600",
                      fontSize: "1.3rem",
                      color: "primary.main",
                    }}
                  >
                    {event.Eventname}
                  </Typography>

                  <ArrowOutwardIcon sx={{ color: "#155693" }} />
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Events;
