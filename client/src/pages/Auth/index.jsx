import { useReducer } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import TwoPartBlock from '../../components/TwoPartBlock';
import Form from './components/Form';

const Auth = () => {
  const [isSignUp, toggleIsSignUp] = useReducer((prev) => !prev, false);

  const formType = isSignUp ? 'sign up' : 'sign in';

  return (
    <Container maxWidth="md">
      <TwoPartBlock
        left={
          <>
            <Typography fontWeight="medium" sx={{ typography: { xs: 'h6', md: 'h4' } }} mb={2}>
              Recipe Blog
            </Typography>
            <Typography variant="body1">This is a demo project.</Typography>
            <Typography variant="body1">You can {formType} with your Email and Password or with Google.</Typography>
          </>
        }
        right={<Form formType={formType} isSignUp={isSignUp} toggleIsSignUp={toggleIsSignUp} />}
      />
    </Container>
  );
};

export default Auth;
