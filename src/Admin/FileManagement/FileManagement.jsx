import React,{useEffect, useState} from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Link,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GetMenu from "../Components/GetMenu";
import axios from "axios";

const FileManagement = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);

  const fetchFiles = async (menu_path) =>{
    try {
      const baseURL = `https://delightfulbroadband.com/api/filesUpload/fetch-file`;
      const defaultParams = {
        limit: limit,
        path: "null/About Us",
        page: page,
      };
  
      // If menu_path is provided, use it; otherwise, use default parameters
      const url = menu_path 
        ? `${baseURL}?path=${menu_path}&limit=${defaultParams.limit}&page=${defaultParams.page}`
        : `${baseURL}?limit=${defaultParams.limit}&page=${defaultParams.page}`;
  
  

      const response = await axios.get(
        url,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch file");
      }

      console.log(response?.data)
      setData(response?.data)

      
    } catch (error) {
      console.error("Error fetching file:", error);
      setData([])
    }
  }

  const handleDelete = async (href, name) => {
    if(confirm("Are you sure you want to delete" + name)){
      try {
        const reqData = {
          filePath: data?.data?.filePath,
          href: href
        };
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          "https://delightfulbroadband.com/api/filesUpload/delete-file",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: reqData, // This is the correct place to put the data for delete request
          }
        );
    
        if (response.status !== 200) {
          throw new Error("Failed to delete file");
        }
        fetchFiles(data?.data?.filePath)
        console.log("File deleted successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };
  

  useEffect(() => {
    
    fetchFiles('')
  }, []);

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Manage Files
      </Typography>
      {/* component for getting menu and sub menu  */}
      <GetMenu menuPath={fetchFiles} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Files</TableCell>
              <TableCell>Uploaded</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
 
            {
               data?.data?.data?.map((ele, ind)=>(
                <TableRow key={ind}>
  
                    <TableCell>
                      <Link href="#" >
                        {ele.name}
                      </Link>
                    </TableCell>
                    <TableCell>{ele.createdAt}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <DeleteIcon onClick={()=>handleDelete(ele.href, ele.name)} />
                      </IconButton> 
                    </TableCell>
                  
                </TableRow>
                
               ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileManagement;
