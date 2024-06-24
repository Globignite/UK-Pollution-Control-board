import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Spinner from '../Components/Spinner';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TopBar from '../Components/TopBar';
import { AdminNavbar } from '../../Admin/Components/DashboardNavbar';




// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {

    const [loading, setLoading] = useState(false);
    const [userDataError, setUserDataError] = useState({
      email: false,
      password: false
    });
    const navigate = useNavigate();
  
    const isEmail = (emailVal) => {
      let validRegex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailVal.match(validRegex)
    };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true)

    const data = new FormData(event.currentTarget);
    const loginData ={
      email: data.get( 'email').trim(),
      password: data.get('password').trim(),
    }

    const { email , password } = loginData

    setUserDataError({
      email: !email || !isEmail(email),
      password: !password || String(password).length < 6,
    });

    let isValid = [!email || !isEmail(email), !password || String(password).length < 6]
    
    let allTrue = isValid.every(value => value === false)
    console.log(loginData)
    if(allTrue){
        navigate('/dashboard/upload-files')
    }else{
        setUserDataError({
            email: true,
            password: true,
          });
    }


    setLoading(false)
  };

  return (
      <Box sx={{bgcolor:'', height:'100vh', display:'flex'}} >
      {/* <Box sx={{display:'flex', height:'100%', width:'60%'}} > */}
        <Box sx={{width:'60%', height:'100%',  bgcolor:'', alignItems:'center'}} >
        <AdminNavbar />
        <Box sx={{display:'flex', alignItems:'center', bgcolor:'', height:'92%'}} >
            <Box sx={{width:'50%', display:'flex', justifyContent:'center', alignItems:'center'}} >
            <img src="./assets/ukpcb_signin_left.jpg" alt="ukpcb_signin_left" width='70%' height='70%'  />
            </Box>

            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                pr:5,
                width:'50%'
              }}
            >
              <Typography variant="h4" sx={{fontWeight:'bold', color:'secondary.light'}}>
                Welcome!
              </Typography>
              <Typography variant="body1" sx={{color:'grey', fontSize:'0.8rem'}} >
                Enter your email and password to signIn
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  helperText={userDataError.email ? "Enter valid email": "" }
                  error={userDataError.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={userDataError.password}
                  helperText={userDataError.password ? "Enter valid password":""}
                />
                  <Grid item xs sx={{ display:'flex', justifyContent:'end'}}>
                    <Link component={RouterLink} to="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py:1, bgcolor:'secondary.light', '&:hover':{bgcolor:'secondary.dark'} }}
                >
                  <Typography sx={{fontSize:'0.8rem'}} >Sign In</Typography> 
                </Button> 
                <Grid container sx={{display:'flex', justifyContent:'center' }} >
                  <Grid item  >
                    {/* <Link component={RouterLink} to="/signUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link> */}
                  </Grid>
                </Grid>
              </Box>
            {/* </Box> */}
          </Box>
        </Box>

      </Box>
        <Box sx={{width:'40%', height:'99.3%', bgcolor:''}} >
        <img src="./assets/ukpcb_signIn_right.jpg" alt="ukpcb_signIn_right" style={{width:'100%', height:'100%'}}  />
        </Box>


        <Spinner loading={loading} />

        {/* <Container component="main" maxWidth="xs" sx={{bgcolor:'pink'}} >
          <CssBaseline />
        </Container> */}
      </Box>
  );
}