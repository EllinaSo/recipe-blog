import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => (
  <>
    <Header />
    <Box py={{ xs: 2, md: 4 }}>
      <Outlet />
    </Box>
  </>
);

export default Layout;
