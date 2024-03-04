import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';

import { useContextData } from '../../../../context';
import { handleAxiosError } from '../../../../utils/error';
import { setUserToStorage } from '../../../../utils/auth';
import {
  emailValidation,
  usernameMinLength,
  usernameMaxLength,
  usernameValidation,
  passwordLength,
} from '../../../../utils/userValidation';
import { TextInput, PasswordInput } from '../../../../components/FormFields';

import GoogleButton from '../GoogleButton';

const Form = ({ formType, isSignUp, toggleIsSignUp }) => {
  const navigate = useNavigate();
  const { updateContext } = useContextData();

  const toggleFormType = () => {
    toggleIsSignUp();
    reset();
  };

  const [{ loading: signUpLoading }, signUp] = useAxios({
    url: 'api/auth/signup',
    method: 'POST',
    withCredentials: true,
  });
  const [{ loading: signInLoading }, signIn] = useAxios({
    url: 'api/auth/signin',
    method: 'POST',
    withCredentials: true,
  });

  const { control, handleSubmit, getValues, trigger, reset } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      email: '',
      username: '',
    },
    mode: 'onChange',
  });

  const handleOnSubmit = ({ password, username, email }) => {
    if (isSignUp) {
      signUp({ data: { password, username, email } })
        .then(() => {
          toggleFormType();
        })
        .catch(handleAxiosError);
    } else {
      signIn({ data: { password, email } })
        .then(({ data }) => {
          setUserToStorage(data);
          updateContext({ profile: data });
          navigate('/');
        })
        .catch(handleAxiosError);
    }
  };

  const handlePasswordChange = async () => await trigger('confirmPassword');

  const loading = signInLoading || signUpLoading;

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={2}>
        {isSignUp && (
          <Grid item xs={12}>
            <TextInput
              autoFocus
              name="username"
              label="Username"
              placeholder="username"
              control={control}
              rules={{ required: true, ...usernameMinLength, ...usernameMaxLength, validate: usernameValidation }}
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
              validate: emailValidation,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordInput
            name="password"
            label="Password"
            placeholder="********"
            control={control}
            rules={{ required: 'Password is required', ...(isSignUp ? passwordLength : {}) }}
            onChange={handlePasswordChange}
          />
        </Grid>

        {isSignUp && (
          <Grid item xs={12}>
            <PasswordInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="********"
              control={control}
              rules={{
                required: 'Repeat password is required',
                validate: (value) => value === getValues('password') || 'Passwords do not match',
              }}
            />
          </Grid>
        )}
      </Grid>

      <Stack spacing={2} direction="column" sx={{ pt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
        >
          {formType}
        </Button>
        <GoogleButton />
      </Stack>

      <Typography mt={3}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link component="button" onClick={toggleFormType} type="button">
          {`Sign ${isSignUp ? 'in' : 'up'}!`}
        </Link>
      </Typography>
    </form>
  );
};

export default Form;
