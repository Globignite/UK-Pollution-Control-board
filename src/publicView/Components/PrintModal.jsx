import  {  useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Typography, Paper, Grid, Box, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const PrintModal = ({ data, open, title, handleClose }) => {
  const componentRef = useRef();

  const pageStyle = `
    @page {
        margin: 10mm;
    }
    @media print {
        body {
            -webkit-print-color-adjust: exact;
        }
        #print_icon {
            display: none !important;
        }
        #content-box {
            max-height: none !important;
        }
        #disableComponentPrint{
          display: none !important;
        }

        #print-modal{
        maxHeight: auto!important;
        }

        ::-webkit-scrollbar {
          display: none;
        }
        
    }
  `;

  const handlePrint = useReactToPrint({
    documentTitle: `Uttarakhand Pollution Control Board, Government Of Uttarakhand, India`,
    copyStyles: true,
    pageStyle: pageStyle,
    content: () => componentRef.current,
  });

  return (
    <Popup
      open={open}
      style={{ zIndex: "10000" }}
      closeOnDocumentClick={false}
      modal
    >
      <Paper
        id="print-modal"
        sx={{
          padding: 4,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        ref={componentRef}
      >
        <Typography variant="h6" gutterBottom>
          {title} submitted Successfully
        </Typography>
        <Grid container mt={3} spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              {title} Number
            </Typography>
            <Typography>
              {data?.complaintId || data?.enquiryId || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              Status
            </Typography>
            <Typography sx={{ overflowWrap: "break-word" }}>
              {data?.status || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              Date
            </Typography>
            <Typography>
              {data?.createdAt ? data?.createdAt.split("T")[0] : "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              Name
            </Typography>
            <Typography sx={{ overflowWrap: "break-word" }}>
              {data?.name || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              Email
            </Typography>
            <Typography sx={{ overflowWrap: "break-word" }}>
              {data?.email || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              Phone
            </Typography>
            <Typography sx={{ overflowWrap: "break-word" }}>
              {data?.phone || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              Subject
            </Typography>
            <Typography sx={{ overflowWrap: "break-word" }}>
              {data?.subject || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "10px" }}
              component="div"
            >
              {title}
            </Typography>
            <Typography sx={{ overflowWrap: "break-word" }}>
              {data?.complaint || data?.enquiry || "N/A"}
            </Typography>
          </Grid>
          {title !== "Enquiry" && (
            <Grid item xs={12}>
              <Typography variant="body2" component="div">
                {title} Image
              </Typography>
              {data?.files?.length === 0 ? (
                <Typography>N/A</Typography>
              ) : (
                <Box>
                  {data?.files?.map((file, index) => (
                    <img
                      key={index}
                      src={`https://delightfulbroadband.com${file.href}`}
                      width={200}
                      height={100}
                      alt={`Complaint Image ${index + 1}`}
                      style={{ margin: "5px", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(
                          `https://delightfulbroadband.com${file.href}`
                        )
                      }
                    />
                  ))}
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Paper>

      <Box sx={{ float: "right", py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handlePrint}
          endIcon={<PrintIcon />}
        >
          PRINT
        </Button>
      </Box>
    </Popup>
  );
};

export default PrintModal;
