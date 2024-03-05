import { Link as RouterLink } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

import { useContextData } from '../../../../context';

const AddRecipeControl = () => {
  const { profile: { isAdmin } = {} } = useContextData();

  if (isAdmin) {
    return (
      <MenuItem component={RouterLink} to="/new-recipe">
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Add a new recipe" />
      </MenuItem>
    );
  }
  return null;
};

export default AddRecipeControl;
