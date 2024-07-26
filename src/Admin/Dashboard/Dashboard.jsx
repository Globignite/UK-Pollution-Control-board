import { Box, Button, Grid, Paper } from "@mui/material";
import "./Dashboard.css";
import EnquiryStats from "./EnquiryStats";
import ComplaintsStats from "./ComplaintsStats";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState();
  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.get(
        "https://delightfulbroadband.com/api/statistics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <>
      <h3 style={{ padding: "20px" }}>Dashboard</h3>
      <Grid container spacing={2} p={2}>
        <Grid item xs={6}>
          <EnquiryStats data={data} />
        </Grid>
        <Grid item xs={6}>
          <ComplaintsStats data={data} />
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className="dashCard">
            <h4>Files</h4>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <h1>{data?.totalFiles}</h1>
                <p>Total Files</p>
              </Box>
              <Box>
                <h1>{data?.totalPdfFiles}</h1>
                <p>Total PDF</p>
              </Box>
              <Box>
                <h1>{data?.totalExcelFiles}</h1>
                <p>Total Excel</p>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className="dashCard">
            <h4>Medias</h4>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <h1>{data?.totalEvents}</h1>
                <p>Total Events </p>
              </Box>
              <Box>
                <h1>{data?.totalBanners}</h1>
                <p>Total Banners</p>
              </Box>
              <Box>
                <h1>{data?.totalMarquees}</h1>
                <p>Total Marque Text</p>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
