import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const UserListItem = ({ username, profilePicture, email }) => (
  <ListItem>
    {profilePicture && (
      <ListItemIcon>
        <Avatar src={profilePicture} />
      </ListItemIcon>
    )}
    <ListItemText
      disableTypography
      primary={
        <>
          <Typography variant="body2" fontWeight="medium">
            @{username}
          </Typography>
          <Typography variant="body2">{email}</Typography>
        </>
      }
    />
  </ListItem>
);

export default UserListItem;
