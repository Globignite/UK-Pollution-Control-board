import { useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DownloadIcon from "@mui/icons-material/Download";

import useDownloader from "react-use-downloader";

function PdfListContainer({ data }) {
  const componentRef = useRef();
  const { download } = useDownloader();

  useEffect(() => {
    // fetchData();
    // console.log(PDFjson[data])
  }, []);

  return (
    <Box ref={componentRef}>
      <Box id="pdf-content" sx={{ maxHeight: "100vh", overflow: "auto" }}>
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
          <Box
            component={Link}
            to={`https://delightfulbroadband.com${data.href}`}
            target="_blank"
            sx={{ width: "100%", display: "flex" }}
          >
            {data.type === "PDF" ? (
              <PictureAsPdfIcon
                sx={{ "&:hover": { color: "#000" }, color: "#000", mr: 2 }}
              />
            ) : (
              <BackupTableIcon
                sx={{ "&:hover": { color: "#000" }, color: "#000", mr: 2 }}
              />
            )}

            <Typography
              variant="body1"
              sx={{ width: "75%", overflow: "hidden" }}
              color="red"
            >
              {data.name}
            </Typography>
          </Box>
          <Box>
            <DownloadIcon
              onClick={() =>
                download(
                  "https://delightfulbroadband.com" + data.href,
                  `${data.name}.${data.href.split(".")[1]}`
                )
              }
              sx={{ marginLeft: "auto" }}
            />
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
