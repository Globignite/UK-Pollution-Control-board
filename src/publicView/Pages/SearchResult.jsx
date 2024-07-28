import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
  Button,
  Breadcrumbs,
  Pagination,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import PdfListContainer from "../Pdf_ListContainer";
import ExcelContent from "../ExcelContent";

function SearchResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Assuming a default limit of 10 items per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://delightfulbroadband.com/api/filesUpload/search-file",
          {
            params: { name: query, page, limit },
          }
        );
        console.log(response?.data.pagination);
        setResults(response?.data?.data);
        setPagination(response?.data?.pagination);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [query, page, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const generateBreadcrumbs = (path) => {
    const parts = path.split("/").filter((part) => part !== "null");
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {parts?.map((part, index) => (
          <Link key={index} href="#" color="inherit">
            {part}
          </Link>
        ))}
      </Breadcrumbs>
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Result
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {results?.length > 0 ? (
            <>
              {results.map((result, index) => (
                <React.Fragment key={index}>
                  <Paper sx={{ mb: 2, p: 2 }}>
                    <Box sx={{ p: 2 }}>{generateBreadcrumbs(result.path)}</Box>
                    {result.data.map((item, index) =>
                      item.type === "PDF" ? (
                        <PdfListContainer data={item} key={index} />
                      ) : (
                        <ExcelContent excelData={item} />
                      )
                    )}
                  </Paper>
                </React.Fragment>
              ))}
            </>
          ) : (
            <Typography>No results found</Typography>
          )}

          <Box mt={2}>
            <Typography>
              Page: {page} of {pagination?.totalPages}
            </Typography>
            {pagination?.totalPages > 1 && (
              <Pagination
                count={pagination?.totalPages}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                color="primary"
              />
            )}
          </Box>
        </>
      )}
    </Container>
  );
}

export default SearchResult;
