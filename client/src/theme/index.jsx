import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const white = '#ffffff';

export default createTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: white,
    },
    secondary: {
      main: white,
      dark: orange[50],
      contrastText: orange[500],
    },
    text: {
      secondary: white,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});
