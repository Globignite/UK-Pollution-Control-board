import React from 'react'; 
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Card, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.footer, 
    color: "lightblack",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "gray",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Dynamic Table Component
const TableComponent = ({ title, tblData }) => {
  return (
    <TableContainer component={Card} elevation={5} sx={{ margin: '20px', overflowX: 'auto' }}>
      <Typography variant="h6" sx={{ margin: '10px' }}>{title}</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(tblData[0]).map((key, index) => (
              <StyledTableCell key={index}>{key}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tblData.map((row, rowIndex) => (
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

// Table Container Component
export default function TableContent({ title, data }) {
  return (
    <Box padding={2}>
      <Typography variant='h5' sx={{ my: 2, color: "blue" }}>{title} </Typography>
      {data.map((table, index) => (
        <TableComponent key={index} title={table.title} tblData={table.data} />
      ))}
    </Box>
  );
};