import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Form from './components/Form';

const Profile = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper sx={{ p: { xs: 4, sm: 6 } }}>
        <Stack gap={4} direction="row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Stack width={{ xs: '100%', md: '50%' }} justifyContent="center" gap={{ xs: 0, md: 1 }}>
            <Typography fontWeight="medium" sx={{ typography: { xs: 'h6', md: 'h4' } }} mb={2}>
              Profile
            </Typography>
            <Typography variant="body1">This is a demo project.</Typography>
            <Typography variant="body1">
              You're welcome to update your avatar, username, password and email without confirmation.
            </Typography>
            <Typography variant="body1">
              Note that if you registered with Google, you can't change your email or password.
            </Typography>
          </Stack>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          <Box width={{ xs: '100%', md: '50%' }}>
            <Form />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
