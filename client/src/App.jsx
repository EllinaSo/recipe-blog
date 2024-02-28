import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import router from './router';
import theme from './theme';
import { DataProvider } from './context';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>

    <ToastContainer position="bottom-left" hideProgressBar theme="colored" />
  </ThemeProvider>
);

export default App;
