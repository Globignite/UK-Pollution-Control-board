// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Grid,
//   Paper,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import Marquee from "react-marquee-master";
// // import Marquee from "react-fast-marquee";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const NoticesAndUpdates = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const fetchNotifications = async () => {
//     try {
//       const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
//       const defaultParams = {
//         limit: limit,
//         path: 'null/Recent Updates',
//         page: page,
//       };
//       const url = `${baseURL}?path=${defaultParams.path}&limit=${defaultParams.limit}&page=${defaultParams.page}`;

//       const response = await axios.get(url, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       setNotifications(response?.data?.data?.data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };


//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   console.log(notifications);

//   return (
//     <Box sx={{ p: { lg: 2, xs: 0 }, mb: { lg: 0, xs: 2 } }}>
//       <Grid container spacing={{ lg: 2, xs: 1 }} maxWidth="lg">
//         <Grid item lg={3} md={3} xs={12}>
//           <Typography
//             variant="h5"
//             sx={{
//               my: 3,
//               fontWeight: "600",
//               fontSize: { lg: "1.6rem", xs: "1rem" },
//               color: "primary.main",
//             }}
//           >
//             Notices
//           </Typography>
//           <Paper
//             elevation={24}
//             sx={{
//               width: { lg: "190px", xs: "150px" },
//               height: { lg: "190px", xs: "150px" },
//               boxShadow: "none",
//               py: 2,
//               bgcolor: "background.lightGreen",
//               borderRadius: "10px",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-around",
//               alignItems: "center",
//             }}
//           >
//             <Link
//               to={"/notices"}
//               sx={{
//                 width: { lg: "70px", xs: "40px" },
//                 height: { lg: "70px", xs: "40px" },
//               }}
//             >
//               <img
//                 src={"/assets/notice_1.png"}
//                 alt={"link_logo"}
//                 loading="lazy"
//                 style={{ width: "100%", height: "100%" }}
//               />

//               <Typography
//                 align="center"
//                 sx={{
//                   fontWeight: "530",
//                   fontSize: "0.9rem",
//                   px: 1,
//                   color: "#393838",
//                 }}
//               >
//                 Notice
//               </Typography>
//             </Link>
//           </Paper>
//         </Grid>

//         <Grid item lg={9} md={9} xs={12} container direction="column">
//           <Typography
//             variant="h5"
//             sx={{
//               my: 3,
//               fontWeight: "600",
//               fontSize: { lg: "1.6rem", xs: "1rem" },
//               color: "primary.main",
//             }}
//           >
//             Recent Update
//           </Typography>
//           <Box
//             sx={{
//               bgcolor: "background.footer",
//               height: "200px",
//               borderRadius: "15px",
//               px: 2,
//               py: 1,
//               border:"1px solid red"
//             }}
//           >
//           //notifications state should be mapped there
        
            
//           </Box>
//           <Link to={"/recent-updates"}>read more</Link>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default NoticesAndUpdates;

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import axios from "axios";

const NoticesAndUpdates = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchNotifications = async () => {
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const defaultParams = {
        limit: limit,
        path: 'null/Recent Updates',
        page: page,
      };
      const url = `${baseURL}?path=${defaultParams.path}&limit=${defaultParams.limit}&page=${defaultParams.page}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNotifications(response?.data?.data?.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, limit]);

  return (
    <Box sx={{ p: { lg: 2, xs: 0 }, mb: { lg: 0, xs: 2 } }}>
      <Grid container spacing={{ lg: 2, xs: 1 }} maxWidth="lg">
        <Grid item lg={3} md={3} xs={12}>
          <Typography
            variant="h5"
            sx={{
              my: 3,
              fontWeight: "600",
              fontSize: { lg: "1.6rem", xs: "1rem" },
              color: "primary.main",
            }}
          >
            Notices
          </Typography>
          <Paper
            elevation={24}
            sx={{
              width: { lg: "190px", xs: "150px" },
              height: { lg: "190px", xs: "150px" },
              boxShadow: "none",
              py: 2,
              bgcolor: "background.lightGreen",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link
              to={"/notices"}
              sx={{
                width: { lg: "70px", xs: "40px" },
                height: { lg: "70px", xs: "40px" },
              }}
            >
              <img
                src={"/assets/notice_1.png"}
                alt={"link_logo"}
                loading="lazy"
                style={{ width: "100%", height: "100%" }}
              />

              <Typography
                align="center"
                sx={{
                  fontWeight: "530",
                  fontSize: "0.9rem",
                  px: 1,
                  color: "#393838",
                }}
              >
                Notice
              </Typography>
            </Link>
          </Paper>
        </Grid>

        <Grid item lg={9} md={9} xs={12} container direction="column">
          <Typography
            variant="h5"
            sx={{
              my: 3,
              fontWeight: "600",
              fontSize: { lg: "1.6rem", xs: "1rem" },
              color: "primary.main",
            }}
          >
            Recent Update
          </Typography>
          <Box
            sx={{
              bgcolor: "background.footer",
              height: "200px",
              borderRadius: "15px",
              px: 2,
              py: 1,
              border: "1px solid red",
              overflow: "auto", // Ensure the box scrolls if content overflows
            }}
          >     <div style={{ height: "50px" }}>
             <Marquee 
              direction="up"
              height={600}
              >
            {notifications.map((notification, index) => (
                <a key={index} href={`https://delightfulbroadband.com${notification.href}`}>
                   {notification.name} // Change 'title' to the actual key for the notification title
                </a>
              ))}
            </Marquee>
          </div>
           
          </Box>
          <Link to={"/recent-updates"}>read more</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoticesAndUpdates;
