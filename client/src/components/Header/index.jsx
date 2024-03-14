import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

import { useContextData } from '../../context';
import { SIGN_IN, LINKS, DASHBOARD_LINKS } from '../../constants';

import Logo from './components/Logo';
import MobileMenu from './components/MobileMenu';
import SearchField from './components/SearchField';
import UserMenu from './components/UserMenu';

const Header = () => {
  const { profile } = useContextData();

  const [links, shortedLinks] = useMemo(() => {
    const links = profile?.isAdmin ? DASHBOARD_LINKS : DASHBOARD_LINKS.filter(({ adminPage }) => !adminPage);
    return [links, links.slice(0, 2)];
  }, [profile?.isAdmin]);

  return (
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
            <MobileMenu
              links={LINKS}
              userLinks={links}
              user={
                profile
                  ? { email: profile.email, username: profile.username, profilePicture: profile.profilePicture }
                  : null
              }
            />
          </Box>

          <Box display={{ xs: 'none', md: 'block' }}>
            {profile ? (
              <UserMenu
                profilePicture={profile.profilePicture}
                username={profile.username}
                email={profile.email}
                links={shortedLinks}
              />
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LoginIcon />}
                component={RouterLink}
                to={SIGN_IN.path}
              >
                {SIGN_IN.text}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
