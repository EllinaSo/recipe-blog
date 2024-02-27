import { RouterProvider, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import router from './router';
import theme from './theme';

import Header from './components/Header';

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>

    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
