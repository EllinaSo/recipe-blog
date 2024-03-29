import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

import { SIGN_IN } from '../../../../constants';

import SignOutControl from '../SignOutControl';
import AddRecipeControl from '../AddRecipeControl';
import UserListItem from '../UserListItem';

const MobileMenu = ({ links, user, userLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => handleClose();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <IconButton size="large" edge="end" color="inherit" aria-label="Menu" onClick={() => setIsOpen((prev) => !prev)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        open={isOpen}
        handleClose={handleClose}
        anchor="right"
        ModalProps={{ onBackdropClick: handleClose }}
        elevation={0}
      >
        <Box role="presentation" onClick={handleClose} sx={{ minWidth: { xs: '80vw', sm: '40vw' } }}>
          <List>
            {links.map(({ title, path }) => (
              <ListItem key={title} disablePadding>
                <ListItemButton component={RouterLink} to={path}>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {user ? (
            <List>
              <UserListItem {...user} />

              <AddRecipeControl />

              {userLinks.map(({ title, path }) => (
                <MenuItem key={title} component={RouterLink} to={path} disablePadding>
                  <ListItemText primary={title} />
                </MenuItem>
              ))}

              <SignOutControl />
            </List>
          ) : (
            <ListItem>
              <ListItemButton component={RouterLink} to={SIGN_IN.path}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={SIGN_IN.text} />
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
