import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useContextData } from '../../../../context';
import { TextInput, PasswordInput, ImageInput } from '../../../../components/FormFields';

import DeleteAccountControl from '../DeleteAccountControl';

const Form = () => {
  const {
    profile: { email, username, profilePicture },
  } = useContextData();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      profilePicture,
      email,
      username,
    },
    mode: 'onChange',
  });

  const handleOnSubmit = (data) => {
    console.log(data);
  };

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
            rules={{ required: true }}
          />
        </Grid>
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
          />
        </Grid>
        <Grid item xs={12}>
          <ImageInput label="Upload avatar" control={control} name="profilePicture" />
        </Grid>
      </Grid>

      <Stack spacing={2} direction="column" sx={{ pt: 3 }}>
        <Button variant="contained" fullWidth type="submit">
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
