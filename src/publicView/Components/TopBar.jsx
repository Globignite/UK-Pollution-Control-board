import {useState} from 'react';
import { Box, Container, FormControl, Select, MenuItem } from '@mui/material';


const TopBar = () => {

    const [language, setLanguage] = useState('English');

    const handleChange = (event) => {
      setLanguage(event.target.value);
    };

  return (     
        <Box position="static" sx={{bgcolor:'secondary.main', py:1, height:'50px', display:'flex', alignItems:'center'}} >
          <Container sx={{display:'flex', justifyContent:'space-between'}}  >
            <Box sx={{display:'flex', alignItems:'center'}} >
              <img src={'./assets/ashok_sthambha.png'} alt="" style={{height:'40px'}} />
              <img src={'./assets/akam_logo.png'} alt="" style={{height:'40px', marginLeft:'20px'}} />
            </Box>

            {/* <Box sx={{display:'flex', alignItems:'center'}} >
              <FormControl sx={{ p:0, color:"#fff" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  // label="Language"
                  onChange={handleChange}
                >
                  <MenuItem value={'English'}>English</MenuItem>
                  <MenuItem value={'Hindi'}>Hindi</MenuItem>
                </Select>
              </FormControl>
            </Box> */}

          </Container>
      </Box>
  )
}

export default TopBar