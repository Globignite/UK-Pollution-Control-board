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
  Breadcrumbs
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from "axios";

function SearchResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://delightfulbroadband.com/api/filesUpload/search-file", {
          params: { name: query }
        });
        setResults(response?.data?.data);
        setPagination(response?.data?.pagination);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

  const handlePageChange = (newPage) => {
    searchParams.set('page', newPage);
    location.search = searchParams.toString();
  };

  const generateBreadcrumbs = (path) => {
    const parts = path.split('/');
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {parts.map((part, index) => (
          <Link key={index} href="#" color="inherit">
            {part}
          </Link>
        ))}
      </Breadcrumbs>
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Search Result</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {results?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Path</TableCell>
                    <TableCell>File</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results?.map((result, index) => (
                    <React.Fragment key={index}>
                      {result?.data?.map((file, i) => (
                        <TableRow key={i}>
                          {i === 0 && (
                            <TableCell rowSpan={result?.data?.length}>
                              {generateBreadcrumbs(result?.path)}
                            </TableCell>
                          )}
                          <TableCell>
                            <Button
                              onClick={() => alert(`File Name: ${file?.name}, File Type: ${file?.type}`)}
                              href="#"
                              style={{ textTransform: 'none' }}
                            >
                              <Box style={{display:"flex"}}>
                                <p>{file?.name}</p>
                                <p>{file?.type}</p>
                              </Box>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No results found</Typography>
          )}
          <Box mt={2}>
            <Typography>Page: {pagination?.currentPage} of {pagination?.totalPages}</Typography>
            <Box>
              {pagination?.hasPreviousPage && (
                <Button onClick={() => handlePageChange(pagination?.currentPage - 1)}>Previous</Button>
              )}
              {pagination?.hasNextPage && (
                <Button onClick={() => handlePageChange(pagination?.currentPage + 1)}>Next</Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

export default SearchResult;
