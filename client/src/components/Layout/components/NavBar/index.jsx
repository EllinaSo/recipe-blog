import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { logout } from '../../../../actions/auth';

const NavBar = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((store) => store.auth);

  return (
    <AppBar position="static" component="nav">
      <Container maxWidth="lg">
        <Stack alignItems="center" justifyContent="space-between" direction="row" gap={2} py={1}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            <Stack alignItems="center" direction="row" gap={2}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Mementos
              </Typography>
              <ContactEmergencyIcon />
            </Stack>
          </Link>
          <Toolbar disableGutters sx={{ gap: 4 }}>
            {profile ? (
              <>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar alt={profile.name} src={profile.picture}>
                    {profile.name.charAt(0)}
                  </Avatar>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {profile.name}
                  </Typography>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'rgb(255 255 255 / 30%)', borderWidth: 1 }} />

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(logout())}
                >
                  Log out
                </Button>
              </>
            ) : <Button component={RouterLink} to="/auth" variant="contained" color="success">Sign in</Button>}
          </Toolbar>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default NavBar;
