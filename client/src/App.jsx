import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import router from './router';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    <ToastContainer position="bottom-left" hideProgressBar theme="colored" />
  </ThemeProvider>
);

export default App;
