import { useReducer, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import PasswordField from './components/PasswordField';

const STATE = {
  password: '',
  repeatPassword: '',
  email: '',
  username: '',
};

const Auth = () => {
  const [isSignUp, toggleIsSignIn] = useReducer((prev) => !prev, false);

  const [userData, setUserData] = useState(STATE);
  const { password, email, username, repeatPassword } = userData;

  const changeHandle = ({ target: { name, value } }) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const formType = isSignUp ? 'sign up' : 'sign in';

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 6 }}>
        <Stack gap={4} direction="row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Stack width={{ xs: '100%', md: '50%' }} justifyContent="center" gap={{ xs: 0, md: 1 }}>
            <Typography sx={{ fontWeight: 'medium', typography: { xs: 'h6', md: 'h4' } }} mb={2}>
              Recipe Blog
            </Typography>
            <Typography variant="body1">This is a demo project.</Typography>
            <Typography variant="body1">You can sign up with your Email and Password or with Google.</Typography>
          </Stack>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          <Box width={{ xs: '100%', md: '50%' }} component="form">
            <Grid container spacing={2}>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    name="username"
                    label="Username"
                    value={username}
                    onChange={changeHandle}
                    placeholder="username"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  autoFocus
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={changeHandle}
                  placeholder="email@example.com"
                />
              </Grid>

              <Grid item xs={12}>
                <PasswordField
                  name="password"
                  label="Password"
                  value={password}
                  onChange={changeHandle}
                  placeholder="*********"
                />
              </Grid>

              {isSignUp && (
                <Grid item xs={12}>
                  <PasswordField
                    name="repeatPassword"
                    label="Repeat password"
                    value={repeatPassword}
                    onChange={changeHandle}
                    placeholder="*********"
                  />
                </Grid>
              )}
            </Grid>

            <Stack spacing={2} direction="row" sx={{ pt: 3 }}>
              <Button variant="contained" fullWidth type="submit">
                {formType}
              </Button>
            </Stack>

            <Typography mt={3}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Link component="button" onClick={toggleIsSignIn} type="button">
                {`Sign ${isSignUp ? 'in' : 'up'}!`}
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Auth;
