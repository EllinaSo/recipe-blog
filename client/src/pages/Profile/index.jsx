import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import TwoPartBlock from '../../components/TwoPartBlock';
import Form from './components/Form';

const Profile = () => {
  return (
    <Container maxWidth="md">
      <TwoPartBlock
        left={
          <>
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
          </>
        }
        right={<Form />}
      />
    </Container>
  );
};

export default Profile;
