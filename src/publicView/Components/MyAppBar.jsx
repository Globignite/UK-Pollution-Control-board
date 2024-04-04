import {useState} from 'react';
import { AppBar, Toolbar, Grid, Typography, Box, Container, FormControl, Select, MenuItem } from '@mui/material';

const MyAppBar = () => {

  const [language, setLanguage] = useState('English');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };


  return (
    <>
      <Box position="static" sx={{bgcolor:'secondary.main', py:1, height:'50px', display:'flex', alignItems:'center'}} >
          <Container sx={{display:'flex', justifyContent:'space-between'}}  >
            <Box sx={{display:'flex', alignItems:'center'}} >
              <img src={'./src/assets/ashok_sthambha.png'} alt="" style={{height:'40px'}} />
              <img src={'./src/assets/akam_logo.png'} alt="" style={{height:'40px', marginLeft:'20px'}} />
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
      
      {/* main header */}
      <Box sx={{mb:3,py:5}}>
        <Container maxWidth="lg">
          <Grid container >
            <Grid item xs={9} sx={{display:'flex', alignItems:'center'}}  >
              <img src={'./src/assets/logo.png'} alt="main_logo" width={90} height={90} />
              <Box sx={{ml:1}} >
                <Typography variant='h2' sx={{fontSize:'1.8rem', fontWeight:'560'}}>
                  UTTARAKHAND POLLUTION CONTROL BOARD
                </Typography>
                <Typography sx={{fontSize:'1.2rem', fontWeight:'500'}} >
                  Government Of Uttarakhand
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={3} >

            </Grid>

          </Grid>
        </Container>

    </Box>
    </>
  );
};

export default MyAppBar;
