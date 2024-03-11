import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { useContextData } from '../../../../context';
import {
  emailValidation,
  usernameMinLength,
  usernameMaxLength,
  usernameValidation,
  passwordLength,
} from '../../../../utils/userValidation';
import { TextInput, PasswordInput, ImageInput } from '../../../../components/FormFields';
import { setUserToStorage } from '../../../../utils/auth';
import { handleAxiosError } from '../../../../utils/error';
import { handleSuccess } from '../../../../utils/success';

import DeleteAccountControl from '../DeleteAccountControl';

const SIZE = 60;

const Form = () => {
  const {
    updateContext,
    profile: { email, username, profilePicture, _id: id, isGoogleUser },
  } = useContextData();

  const [{ loading }, updateUserData] = useAxios({
    url: `api/user/update/${id}`,
    method: 'PUT',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm({
    defaultValues: {
      profilePicture,
      email,
      username,
    },
    mode: 'onChange',
  });

  const handleOnSubmit = (userData) =>
    updateUserData({ data: userData })
      .then(({ data }) => {
        setUserToStorage(data);
        updateContext({ profile: data });
        handleSuccess('User has been updated');
      })
      .catch(handleAxiosError);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={2}>
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
        {!isGoogleUser && (
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
        )}
        {!isGoogleUser && (
          <Grid item xs={12}>
            <PasswordInput
              name="password"
              label="New password"
              placeholder="********"
              control={control}
              rules={passwordLength}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <ImageInput
            label="Upload avatar"
            control={control}
            name="profilePicture"
            rules={{ required: true }}
            renderPreview={useCallback(
              ({ loading, src, control, error }) => (
                <Stack direction="row" gap={1} alignItems="center">
                  <Box position="relative">
                    <Avatar src={src} sx={{ width: SIZE, height: SIZE }} alt="User avatar" />
                    <CircularProgress
                      variant="determinate"
                      value={loading}
                      size={SIZE}
                      sx={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  </Box>
                  <div>
                    {control}
                    {!!(isSubmitted && error) && (
                      <Typography color="error" variant="caption" as="p" ml={1}>
                        {error}
                      </Typography>
                    )}
                  </div>
                </Stack>
              ),
              [isSubmitted]
            )}
          />
        </Grid>
      </Grid>

      <Stack spacing={2} direction="column" sx={{ pt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
        >
          Update
        </Button>
      </Stack>

      <Box mt={3}>
        <DeleteAccountControl />
      </Box>
    </form>
  );
};

export default Form;
