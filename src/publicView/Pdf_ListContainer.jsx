import { useState, useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";

function PdfListContainer({ title, data }) {
  const [PDFjson, setPDFjson] = useState([]);

  const fetchData = async() =>{
    
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_PDFJSONFILE_URL}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',

      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await res.json();
      // console.log(data);
      setPDFjson(data)

    } catch (error) {
      console.error('Error uploading file:');
    }
  }

  useEffect(() => {
    fetchData()
    // console.log(PDFjson[data])
  }, []);

  return (
    <Box padding={{lg:2, xs:0}}  > 
      <Typography variant="h5" sx={{ my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main' }}>
        {title}
      </Typography>

      <Box sx={{height:'100vh', overflow:'auto'}} >
        {

        PDFjson[data]?.map((item, index) => (
          <Card
            key={index}
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
            <PictureAsPdfIcon   />
            <Typography variant="body1" color="red">{item.name}</Typography>
            <DownloadIcon sx={{   marginLeft: "auto" }} />
          </Card>
        ))
        }
      </Box>
    </Box>
  );
}

export default PdfListContainer;
