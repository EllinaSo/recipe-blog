import { useReducer } from 'react';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Form from './components/Form';

const Auth = () => {
  const [isSignUp, toggleIsSignUp] = useReducer((prev) => !prev, false);

  const formType = isSignUp ? 'sign up' : 'sign in';

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper sx={{ p: { xs: 4, sm: 6 } }}>
        <Stack gap={4} direction="row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Stack width={{ xs: '100%', md: '50%' }} justifyContent="center" gap={{ xs: 0, md: 1 }}>
            <Typography sx={{ fontWeight: 'medium', typography: { xs: 'h6', md: 'h4' } }} mb={2}>
              Recipe Blog
            </Typography>
            <Typography variant="body1">This is a demo project.</Typography>
            <Typography variant="body1">You can {formType} with your Email and Password or with Google.</Typography>
          </Stack>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          <Box width={{ xs: '100%', md: '50%' }}>
            <Form formType={formType} isSignUp={isSignUp} toggleIsSignUp={toggleIsSignUp} />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Auth;
