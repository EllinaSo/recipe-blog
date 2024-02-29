import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import SignOutControl from '../SignOutControl';
import UserListItem from '../UserListItem';

const UserMenu = ({ username, profilePicture, email, links }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar src={profilePicture} />
        </IconButton>
      </Tooltip>

      <Menu
        keepMounted
        sx={{ mt: '40px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <UserListItem username={username} email={email} />

        <Divider />

        {links.map(({ path, title }) => (
          <MenuItem key={path} component={RouterLink} to={path} onClick={handleCloseUserMenu}>
            <ListItemText primary={title} />
          </MenuItem>
        ))}

        <SignOutControl />
      </Menu>
    </>
  );
};

export default UserMenu;
