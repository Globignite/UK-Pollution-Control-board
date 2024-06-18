import { useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { RoutesJson } from "../RoutesJson";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useReactToPrint } from "react-to-print";

const LinksContainer = ({ itemData }) => {
  const componentRef = useRef();

  const submenuItems = RoutesJson.filter(
    (item) => item.parent_id === itemData.id
  );

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

  const handlePrint = useReactToPrint({
    documentTitle: `${itemData.name}: Uttarakhand Pollution Control Board , Government Of Uttarakhand, India`,
    copyStyles: true,
    pageStyle: pageStyle,
    content: () => componentRef.current,
  });

  return (
    <Box ref={componentRef}>
      <Box
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
          {itemData.name}
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
      </Box>
      {submenuItems.map((item) => (
        <Link to={`${item.path}`} key={item.path}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "20px",
              p: 2,
              cursor: "pointer",
            }}
          >
            <Typography variant="body1" color="red">
              {item.name}
            </Typography>
            <ArrowRightAltIcon />
          </Card>
        </Link>
      ))}
      <Box id="footer" sx={{ display: "none" }}>
        Source: Uttarakhand Pollution Control Board, Government Of Uttarakhand,
        Last Updated on 15-06-2024
      </Box>
    </Box>
  );
};

export default LinksContainer;
