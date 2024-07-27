import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Typography, Paper, Grid, Box, Button } from '@mui/material';
import { useReactToPrint } from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';

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
    <Popup open={open} style={{ zIndex: '10000' }}  closeOnDocumentClick={false} modal>
      <Paper id="print-modal" sx={{ padding:{lg:4, xs:1}, width: '100%', maxHeight:'90vh', overflowY:'auto',}} ref={componentRef}>
        <Typography variant="h6" gutterBottom>
          {title} Details
        </Typography>
        <Grid container mt={3} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" component="div">
              {title} Number
            </Typography>
            <Typography>{data?.complaintId || data?.enquiryId || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="div">
              Status
            </Typography>
            <Typography>{data?.status || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="div">
              Subject
            </Typography>
            <Typography>{data?.subject || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="div">
              Name
            </Typography>
            <Typography>{data?.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="div">
              Email
            </Typography>
            <Typography>{data?.email || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="div">
              Phone
            </Typography>
            <Typography>{data?.phone || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="div">
              {title}
            </Typography>
            <Typography>{data?.complaint || data?.enquiry || 'N/A'}</Typography>
          </Grid>
            {
              data?.complaintId &&
              <Grid item xs={12} sx={{mb:3}}>
                <Typography variant="body2" component="div">
                  {title} Image
                </Typography>

                    {data?.files?.length === 0 ? (
                      <Typography>N/A</Typography>
                    ) : (
                      <Box sx={{display:'flex', flexWrap:'wrap'}}>
                        {data?.files?.map((file, index) => (
                          <Box sx={{width:{lg:150, sm:100, xs:50}, height:{lg:130, sm:80, xs:30}}} >
                            <img
                              key={index}
                              src={`https://delightfulbroadband.com${file.href}`}
                              width="100%"
                              height="100%"
                              alt={`Image ${index + 1}`}
                              style={{ margin: '5px' }}
                            />
                          </Box>

                        ))}
                      </Box>
                    )}



              </Grid>
            }
          <Grid item xs={4}>
            <Typography variant="body2" component="div">
              Date
            </Typography>
            <Typography>
              {data?.createdAt ? data?.createdAt.split('T')[0] : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" component="div">
              In Progress Date
            </Typography>
            <Typography>
              {data?.progress_date ? data?.progress_date.split('T')[0] : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" component="div">
              Resolved Date
            </Typography>
            <Typography>
              {data?.resolve_date ? data?.resolve_date.split('T')[0] : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ float: 'right', py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handlePrint} endIcon={<PrintIcon />}>
          PRINT
        </Button>
      </Box>
    </Popup>
  );
};

export default PrintModal