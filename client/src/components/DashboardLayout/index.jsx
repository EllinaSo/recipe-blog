import { useMemo } from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { DASHBOARD_LINKS } from '../../constants';
import { useContextData } from '../../context';

const ICONS = {
  Dashboard: <LeaderboardIcon fontSize="small" />,
  Profile: <PersonIcon fontSize="small" />,
  Recipes: <MenuBookIcon fontSize="small" />,
};

const drawer = {
  maxWidth: 300,
  width: '25%',
};

const DashboardLayout = () => {
  const { profile: { isAdmin } = {} } = useContextData();

  const links = useMemo(
    () => (isAdmin ? DASHBOARD_LINKS : DASHBOARD_LINKS.filter(({ adminPage }) => !adminPage)),
    [isAdmin]
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        open={false}
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.appBar - 1,
          ...drawer,
          ['& .MuiDrawer-paper']: {
            boxSizing: 'border-box',
            ...drawer,
          },
        }}
      >
        <Toolbar />

        <Box>
          <List>
            {links.map(({ title, path }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton component={RouterLink} to={path}>
                  <ListItemIcon>{ICONS[title]}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container sx={{ flexGrow: 1 }} maxWidth={false}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default DashboardLayout;
