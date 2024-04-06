import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#155693',
      footer_links: '#2b5830'
    },
    secondary: {
      main: '#179315',
      light: '#3da73c',
      lightest:'#9dda9d',
      navbar:'#b1e5b0'
    },
    pdf_text: {
      main: '#ec4b4b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#fff',
      header: '#f8fcf8',
      footer: '#d7e8f9',
      lightGreen: '#f8fcf8'
    },
  },
});

export default theme;
