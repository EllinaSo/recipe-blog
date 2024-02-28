import { createTheme } from '@mui/material/styles';
import { orange, grey } from '@mui/material/colors';

const white = '#ffffff';
const textColor = grey[800];
const mainOrange = orange[500];

export default createTheme({
  palette: {
    primary: {
      main: mainOrange,
      dark: orange[700],
      contrastText: white,
    },
    secondary: {
      main: white,
      dark: orange[50],
      contrastText: mainOrange,
    },
    text: {
      secondary: white,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: textColor,
        },
      },
    },
  },
});
