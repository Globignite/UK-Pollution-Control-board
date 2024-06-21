import React, { useState, useEffect, useRef } from 'react';
import PdfListContainer from './Pdf_ListContainer';
import { useReactToPrint } from "react-to-print";
import { Box, Typography, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ExcelContent from './ExcelContent';

function DynamicComponent({ parentMenu, currentMenu }) {
  const [jsonData, setJsonData] = useState({});
  const componentRef = useRef();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_PDFJSONFILE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching data', error);
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
    fetchData();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Combine parentMenu and currentMenu to form the key
  const key = `${parentMenu}/${currentMenu}`;
  const dataToDisplay = jsonData[key] ? jsonData[key].slice((page - 1) * rowsPerPage, page * rowsPerPage) : [];

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

      {jsonData[key] ? (
        jsonData[key].length === 0 ? (
          <p>No data available</p>
        ) : (
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
              <ul>
                {dataToDisplay.map((value, index) => (
                  <div key={index}>
                    {value.type === 'PDF' ? (
                      <PdfListContainer data={value} />
                    ) : (
                      <ExcelContent excelData={value} />
                    )}
                  </div>
                ))}
              </ul>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
              {/* <FormControl variant="outlined">
                <InputLabel>Rows per page</InputLabel>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  label="Rows per page"
                >
                  {[5, 10, 25, 50].map((rowsPerPageOption) => (
                    <MenuItem key={rowsPerPageOption} value={rowsPerPageOption}>
                      {rowsPerPageOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <Pagination
                count={Math.ceil(jsonData[key].length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
                color="primary"
              />
            </Box>
          </>
        )
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
