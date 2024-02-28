import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => (
  <>
    <Header />
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Outlet />
    </Container>
  </>
);

export default Layout;
