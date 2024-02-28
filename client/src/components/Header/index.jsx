import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

import Logo from './components/Logo';
import MobileMenu from './components/MobileMenu';
import SearchField from './components/SearchField';

const LINKS = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/recipes',
    title: 'Recipes',
  },
];

const LOG_IN_PATH = '/auth';

const Header = () => (
  <AppBar elevation={0} position="sticky">
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ gap: 4 }}>
        <Logo />
        <SearchField />

        <Box
          display={{ xs: 'none', md: 'flex' }}
          sx={{ flexGrow: 1 }}
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          {LINKS.map(({ title, path }) => (
            <Button key={title} component={RouterLink} to={path} variant="text" color="secondary">
              {title}
            </Button>
          ))}
        </Box>

        <Box sx={{ ml: 'auto', display: { xs: 'block', md: 'none' } }}>
          <MobileMenu links={LINKS} logInPath={LOG_IN_PATH} />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<LoginIcon />}
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          component={RouterLink}
          to={LOG_IN_PATH}
        >
          Log in
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
