import { useRef } from 'react'; 
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Card, Typography } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.footer, 
    color: "lightblack",
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

 

const TableComponent = ({ title, tblData }) => {
  return (
    <TableContainer component={Card} elevation={5} sx={{ maxHeight:'100vh', overflow:'auto', margin: { lg: '20px', xs: 0 }, overflowX: 'auto' }}>
      <Typography variant="h6" sx={{ margin: '10px' }}>{title}</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(tblData[0])?.map((key, index) => (
              <StyledTableCell key={index}>{key}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tblData?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((value, valueIndex) => (
                <StyledTableCell key={valueIndex}>{value}</StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComponent.propTypes = {
  title: PropTypes.string.isRequired,
  tblData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const TableContent = ({ title, data }) => {
  const componentRef = useRef();

  const pageStyle = `
    @page {
      margin: 10mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
      #print_button {
        display: none;
      }
      #footer{
                display: block;
                position: fixed;
                bottom: 0;
                width: 100%;
                text-align: center;
                font-size: 12px;
                color: #555;
      }
      h5{
        font-size: 1.3rem !important; 
      }
      .MuiTableContainer-root {
        overflow: visible !important;
        page-break-inside: avoid;
        box-shadow: none !important;
      }
      .MuiCard-root {
        box-shadow: none !important;
      }
    }
  `;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${title}: Uttarakhand Pollution Control Board , Government Of Uttarakhand, India`,
    pageStyle: pageStyle,
  });

  return (
    <Box padding={{ lg: 2, xs: 0 }} ref={componentRef}>
      <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
        <Typography variant='h5' sx={{ my: 3, fontWeight: '600', fontSize: { lg: '1.8rem', xs: '1rem' }, color: 'primary.main' }}>{title}</Typography>
        <Box
                    onClick={handlePrint}
                    id='print_button'
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <img
                        src="/assets/print.png"
                        alt="print"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <Typography variant="body1" color="error.main">
                        Print
                    </Typography>
      </Box>
      </Box>

      {data.map((table, index) => (
        <TableComponent key={index} title={table.title} tblData={table.data} />
      ))}
      <Box id="footer" sx={{ display: 'none', textAlign: 'center', fontSize: '12px', color: '#555', marginTop: '20px' }}>
        Source: Uttarakhand Pollution Control Board, Government Of Uttarakhand, Last Updated on 15-06-2024
      </Box>
    </Box>
  );
};

TableContent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
};

export default TableContent;
