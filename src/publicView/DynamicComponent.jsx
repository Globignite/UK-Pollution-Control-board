import  { useState, useEffect, useRef } from 'react';
import PdfListContainer from './Pdf_ListContainer';
import ExcelContent from './ExcelContent';
import axios from "axios";
import { Box, Typography, Pagination } from '@mui/material';
import { useReactToPrint } from "react-to-print";

function DynamicComponent({ parentMenu, currentMenu }) {
  const [jsonData, setJsonData] = useState({});
  const componentRef = useRef();
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Assuming a default limit of 1 per page

  const fetchFiles = async (pageNumber) => {
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const url = `${baseURL}?path=${encodeURIComponent(parentMenu)}/${encodeURIComponent(currentMenu)}&limit=${limit}&page=${pageNumber}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch file");
      }

      setJsonData(response.data);
      
    } catch (error) {
      console.error("Error fetching file:", error);
      setJsonData({ data: { data: [], pagination: { totalPages: 0 } } }); // Handle error state
    }
  }

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
        h5 {
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
    documentTitle: `${currentMenu}: Uttarakhand Pollution Control Board, Government Of Uttarakhand, India`,
    copyStyles: true,
    pageStyle: pageStyle,
    content: () => componentRef.current,
  });

  useEffect(() => {
    fetchFiles(page);
  }, [parentMenu, currentMenu, page]); // Ensure fetchFiles runs when parentMenu, currentMenu, or page changes

  const handleChangePage = (event, value) => {
    setPage(value);
  };

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
          {currentMenu}
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

      {jsonData?.data?.data?.length ? ( 
          <>
            <Box
              id="content-box"
              sx={{
                height: '90vh', 
                overflow: 'auto',
                '@media print': {
                  height: 'none !important',
                },
              }}
            >
              <Box>
                {jsonData?.data?.data?.map((value, index) => (
                  <div key={index}>
                    {value.type === 'PDF' ? (
                      <PdfListContainer data={value} />
                    ) : (
                      <ExcelContent excelData={value} />
                    )}
                  </div>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
              <Pagination
                count={jsonData?.pagination?.totalPages || 1} // Default to 1 if totalPages is not available
                page={page}
                onChange={handleChangePage}
                shape="rounded"
                color="primary"
                disabled={jsonData?.pagination?.totalPages === 1}
              />
            </Box>
          </>
      ) : (
        <p>No data available for the selected menu</p>
      )}
      <Box id="footer" sx={{ display: "none" }}>
        Source: Uttarakhand Pollution Control Board, Government Of Uttarakhand,
        Last Updated on 15-06-2024
      </Box>
    </Box>
  );
}

export default DynamicComponent;
