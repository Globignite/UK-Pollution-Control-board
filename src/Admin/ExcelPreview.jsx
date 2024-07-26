import React, { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { Container, Typography, Alert, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination } from '@mui/material';

const ExcelPreview = ({ file }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const handleFileChange = () => {
      if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (['xlsx', 'xls', 'csv'].includes(fileExtension)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = utils.sheet_to_json(firstSheet, { header: 1 });

            if (jsonData.length > 0) {
              const cols = jsonData[0].map((col, idx) => ({ key: idx.toString(), name: col || `Column ${idx + 1}` }));
              const rowsData = jsonData.slice(1).map((row, rowIndex) => {
                let rowObj = {};
                row.forEach((cell, cellIndex) => {
                  rowObj[cellIndex.toString()] = cell;
                });
                return { id: rowIndex.toString(), ...rowObj };
              });
              setColumns(cols);
              setRows(rowsData);
              setError('');
            } else {
              setError('No data found in the Excel file.');
            }
          };
          reader.readAsArrayBuffer(file);
        } else {
          setError('Invalid file type. Please select an Excel file.');
        }
      }
    };

    handleFileChange();
  }, [file]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ mt: 0 }}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {rows.length > 0 && (
        <>
          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell sx={{ fontWeight: 'bolder' }} key={column.key}>{column.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={`${row.id}-${column.key}`}>{row[column.key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
};

export default ExcelPreview;
