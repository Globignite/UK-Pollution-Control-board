import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";

import useDownloader from 'react-use-downloader';

// import { useReactToPrint } from "react-to-print";

function PdfListContainer({ data }) {
  const [PDFjson, setPDFjson] = useState([]);
  const componentRef = useRef();
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
  useDownloader();

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_PDFJSONFILE_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      // console.log(data);
      setPDFjson(data);
    } catch (error) {
      console.error("Error uploading file");
    }
  };

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
            #pdf-content{
                max-height: none !important;
            }
                      h5{
        font-size: 1.3rem !important; 
      }
            #footer {
                display: block;
                position: fixed;
                bottom: 0;
                width: 100%;
                text-align: center;
                font-size: 12px;
                color: #555;
            }
        }
    `;

  // const handlePrint = useReactToPrint({
  //   documentTitle: `${title}: Uttarakhand Pollution Control Board , Government Of Uttarakhand, India`,
  //   copyStyles: true,
  //   pageStyle: pageStyle,
  //   content: () => componentRef.current,
  // });

  useEffect(() => {
    // fetchData();
    // console.log(PDFjson[data])
  }, []);

  return (
    <Box ref={componentRef}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            my: 3,
            fontWeight: "600",
            fontSize: { lg: "1.8rem", xs: "1rem" },
            color: "primary.main",
          }}
        >
          {title}
        </Typography>
        <Box
          onClick={handlePrint}
          id="print_icon"
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/assets/print.png"
            alt="print"
            style={{ width: "40px", height: "40px" }}
          />
          <Typography variant="body1" color="error.main">
            Print
          </Typography>
        </Box>
      </Box> */}

      <Box id="pdf-content" sx={{ maxHeight: "100vh", overflow: "auto" }}>
        {/* {PDFjson[data]?.map((item, index) => (
        ))} */}
          <Card
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: "20px",
              textDecoration: "none",
              backgroundColor: "#20ff9410",
              mb: "20px",
              p: 2,
              cursor: "pointer",
            }}
          >
            <Box component={Link}          
             to={`${import.meta.env.VITE_APP_FILE_BASE_URL}${data.href}`}
            target="_blank"
            sx={{width:'100%', display:'flex' }} >
              <PictureAsPdfIcon sx={{'&:hover':{color:'#000'}, color:'#000', mr:2}} />
              <Typography
                variant="body1"
                sx={{ width: "75%", overflow: "hidden", }}
                color="red"
              >
                {data.name}
              </Typography>
            </Box>
            <Box >
              {console.log(`${data.name}.${data.href.split('.')[1]}`)}
              <DownloadIcon onClick={() => download(import.meta.env.VITE_APP_FILE_BASE_URL+data.href, `${data.name}.${data.href.split('.')[1]}`)} sx={{ marginLeft: "auto" }} />
            </Box>
          </Card>
      </Box>
      <Box id="footer" sx={{ display: "none" }}>
        Source: Uttarakhand Pollution Control Board, Government Of Uttarakhand,
        Last Updated on 15-06-2024
      </Box>
    </Box>
  );
}

export default PdfListContainer;
