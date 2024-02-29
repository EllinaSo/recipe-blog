import { Link as RouterLink } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

import { useContextData } from '../../../../context';
import { removeUserFromStorage } from '../../../../utils/auth';

const SignOutControl = () => {
  const { updateContext } = useContextData();

  return (
    <MenuItem
      component={RouterLink}
      to="/"
      onClick={() => {
        removeUserFromStorage();
        updateContext({ profile: null });
      }}
    >
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Sing out" />
    </MenuItem>
  );
};

export default SignOutControl;
