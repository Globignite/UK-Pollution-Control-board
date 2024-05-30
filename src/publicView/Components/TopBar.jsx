import {useState, useEffect} from 'react';
import { Box, Container, FormControl, Select, MenuItem } from '@mui/material';


const TopBar = () => {

    const [language, setLanguage] = useState('English');

    const handleChange = (event) => {
      setLanguage(event.target.value);
    };

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false
        },
        "google_translate_element"
      );
    };
    useEffect(() => {
      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

  return (     
        <Box position="static" sx={{bgcolor:'secondary.main', py:1, height:'50px', display:'flex', alignItems:'center'}} >
          <Container sx={{display:'flex', justifyContent:'space-between'}}  >
            <Box sx={{display:'flex', alignItems:'center'}} >
              <img src={'/assets/ashok_sthambha.png'} alt="" style={{height:'40px'}} />
              <img src={'/assets/akam_logo.png'} alt="" style={{height:'40px', marginLeft:'20px'}} />
            </Box>

            <Box sx={{display:'flex', alignItems:'center'}} >
              <select name="language" id="lang" className='lang_select' >
                <option value="en">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </Box>

            {/* <div id="google_translate_element"></div> */}

          </Container>
      </Box>
  )
}

export default TopBar