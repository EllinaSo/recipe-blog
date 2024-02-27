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

const Header = () => {
  return (
    <AppBar elevation={0}>
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
      {/* 
      <AppBar.Collapse>
        {LINKS.map(({ path, title }) => (
          <AppBar.Link key={path} as={'div'}>
            <Link
              to={path}
              className={({ isActive }) =>
                ` px-3 py-2 text-md font-medium rounded-md duration-200 ${
                  isActive
                    ? 'text-amber-700 bg-white text-amber-700'
                    : 'text-white hover:bg-white/70 hover:text-amber-700 focus:bg-white/70 focus:text-amber-700'
                }  `
              }
            >
              {title}
            </Link>
          </AppBar.Link>
        ))}
      </AppBar.Collapse>

      <form>
        <label htmlFor="search" className="invisible absolute">
          Search
        </label>
        <input
          id="search"
          name="search"
          className="bg-white h-[40px] rounded-md px-2"
          placeholder="Search"
        />
      </form> */}
    </AppBar>
  );
};

export default Header;
