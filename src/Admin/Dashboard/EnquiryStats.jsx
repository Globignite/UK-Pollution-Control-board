 
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

function EnquiryStats({ data }) {
  const ChartData = [
    { name: "new", value: data?.totalNewEnquiries },
    { name: "in Progress", value: data?.totalInProgressEnquiries },
    { name: "Resolved", value: data?.totalResolvedEnquiries },
  ];

  const COLORS = ["#5e00e6", "#339899", "#204f6f"];

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
        <h4>Enquiries</h4>
        <Button
          component={Link}
          to="/admin/enquiries"
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
          <h3>{data?.totalTodayNewEnquiries}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>New</p>
          <h3>{data?.totalNewEnquiries}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>In Progress</p>
          <h3>{data?.totalInProgressEnquiries}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>Resolved</p>
          <h3>{data?.totalResolvedEnquiries}</h3>
        </Box>
        <Box className="dashStatsCard">
          <p>Total</p>
          <h3>{data?.totalEnquiries}</h3>
        </Box>
      </Box>
    </Paper>
  );
}

export default EnquiryStats;
