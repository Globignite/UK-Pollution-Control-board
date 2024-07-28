import { useState, useEffect } from "react";
import { read, utils, writeFile } from "xlsx";
import {
  Container,
  Typography,
  Box,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination, 
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const ExcelContent = ({ excelData }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchFile = async () => {
      if (excelData) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_FILE_BASE_URL}${excelData?.href}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.arrayBuffer();
          const workbook = read(new Uint8Array(data), { type: "array" });
          const firstSheet = workbook?.Sheets[workbook?.SheetNames[0]];
          const jsonData = utils.sheet_to_json(firstSheet, { header: 1 });

          if (jsonData.length > 0) {
            const cols = jsonData[0]?.map((col, idx) => ({
              key: idx.toString(),
              name: col || `Column ${idx + 1}`,
            }));
            const rowsData = jsonData.slice(1)?.map((row, rowIndex) => {
              let rowObj = {};
              row.forEach((cell, cellIndex) => {
                rowObj[cols[cellIndex]?.name] = cell;
              });
              return { id: rowIndex.toString(), ...rowObj };
            });
            setColumns(cols);
            setRows(rowsData);
            setError("");
          } else {
            setError("No data found in the Excel file.");
          }
        } catch (error) {
          setError("Failed to fetch the file. " + error?.message);
        }
      }
    };

    fetchFile();
  }, [excelData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownload = () => {
    const header = columns.map((col) => col.name);
    const data = [header, ...rows.map((row) => header.map((col) => row[col]))];
    const worksheet = utils.aoa_to_sheet(data);

    // Apply bold style to the header row
    const range = utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = utils.encode_cell({ r: 0, c: C });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        font: { bold: true },
      };
    }

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${excelData?.name}.xlsx`);
  };

  return (
    <Container sx={{ mt: 0, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {rows.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={"bolder"} color="initial">
              {" "}
              {excelData?.name}{" "}
            </Typography>
            <DownloadIcon
              onClick={handleDownload}
              sx={{ cursor: "pointer", "@media print": { display: "none" } }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell sx={{ fontWeight: "bolder" }} key={column.key}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <TableRow key={row.id}>
                      {columns?.map((column) => (
                        <TableCell key={`${row?.id}-${column?.key}`}>
                          {row[column?.name]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rows?.length}
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

export default ExcelContent;
