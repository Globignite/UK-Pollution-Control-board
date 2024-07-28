 
import { Box, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  PieChart,
  Pie, 
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

function ComplaintsStats({ data }) {
  const ChartData = [
    { name: "new", value: data?.totalNewComplaints },
    { name: "in Progress", value: data?.totalInProgressComplaints },
    { name: "Resolved", value: data?.totalResolvedComplaints },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const CustomLegend = () => {
    return (
      <div>
        <ul>
          <li style={{ paddingBlock: "5px", color: COLORS[0] }}>new</li>
          <li style={{ paddingBlock: "5px", color: COLORS[1] }}>in progress</li>
          <li style={{ paddingBlock: "5px", color: COLORS[2] }}>resolved</li>
        </ul>
      </div>
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <h4>Complaints</h4>
        <Button
          component={Link}
          to="/admin/complaints"
          color="success"
          size="small"
          variant="string"
        >
          <ArrowRightAltIcon />
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" gap={1} alignItems="center">
        <ResponsiveContainer width="40%" height={150}>
          <PieChart>
            <Pie
              data={ChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {ChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <CustomLegend />
      </Box>

      {/* individual stats */}
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        gap={1}
        flexWrap={"wrap"}
      >
        <Box className="dashStatsCard">
          <p>Today</p>
          <h3>{data?.totalTodayNewComplaints}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>New</p>
          <h3>{data?.totalNewComplaints}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>In Progress</p>
          <h3>{data?.totalInProgressComplaints}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>Resolved</p>
          <h3>{data?.totalResolvedComplaints}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>Total</p>
          <h3>{data?.totalComplaints}</h3>
        </Box>
      </Box>
    </Paper>
  );
}

export default ComplaintsStats;
