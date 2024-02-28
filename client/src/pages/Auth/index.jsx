import { useReducer } from 'react';
import useAxios from 'axios-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';

import { TextInput, PasswordInput } from '../../components/FormFields';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, toggleIsSignIn] = useReducer((prev) => !prev, false);

  const [{ loading: signUpLoading }, signUp] = useAxios({ url: 'api/auth/signup', method: 'POST' });
  const [{ loading: signInLoading }, signIn] = useAxios({ url: 'api/auth/signin', method: 'POST' });

  const { control, handleSubmit, getValues, trigger } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      email: '',
      username: '',
    },
    mode: 'onChange',
  });

  const handleSign = (axiosPromise) =>
    axiosPromise
      .then(() => navigate('/'))
      .catch((error) => toast.error(error.response?.data?.message || error.message));

  const handleOnSubmit = ({ password, username, email }) => {
    if (isSignUp) {
      return handleSign(signUp({ data: { password, username, email } }));
    }
    return handleSign(signIn({ data: { password, email } }));
  };

  const handlePasswordChange = async () => await trigger('confirmPassword');

  const formType = isSignUp ? 'sign up' : 'sign in';
  const loading = signInLoading || signUpLoading;

  return (
    <Container maxWidth="md" disableGutters>
      <Paper sx={{ p: { xs: 4, sm: 6 } }}>
        <Stack gap={4} direction="row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Stack width={{ xs: '100%', md: '50%' }} justifyContent="center" gap={{ xs: 0, md: 1 }}>
            <Typography sx={{ fontWeight: 'medium', typography: { xs: 'h6', md: 'h4' } }} mb={2}>
              Recipe Blog
            </Typography>
            <Typography variant="body1">This is a demo project.</Typography>
            <Typography variant="body1">You can sign up with your Email and Password or with Google.</Typography>
          </Stack>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          <Box width={{ xs: '100%', md: '50%' }} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid container spacing={2}>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextInput
                    autoFocus
                    name="username"
                    label="Username"
                    placeholder="username"
                    control={control}
                    rules={{ required: true }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextInput
                  autoFocus
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="email@example.com"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email is invalid',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <PasswordInput
                  name="password"
                  label="Password"
                  placeholder="*********"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  onChange={handlePasswordChange}
                />
              </Grid>

              {isSignUp && (
                <Grid item xs={12}>
                  <PasswordInput
                    name="confirmPassword"
                    label="Confirm password"
                    placeholder="*********"
                    control={control}
                    rules={{
                      required: 'Repeat password is required',
                      validate: (value) => value === getValues('password') || 'Passwords do not match',
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <Stack spacing={2} direction="row" sx={{ pt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
                endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
              >
                {formType}
              </Button>
            </Stack>

            <Typography mt={3}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Link component="button" onClick={() => toggleIsSignIn()} type="button">
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
