import useAxios from 'axios-hooks';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleIcon from '@mui/icons-material/Google';

import { app } from '../../../../firebase';
import { useContextData } from '../../../../context';
import { handleError, handleAxiosError } from '../../../../utils/error';
import { setUserToStorage } from '../../../../utils/auth';

const GoogleButton = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { updateContext } = useContextData();

  const [{ loading }, saveUserData] = useAxios({
    url: 'api/auth/google',
    method: 'POST',
  });

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ provider: 'select_account' });

    try {
      const { user } = await signInWithPopup(auth, provider);
      saveUserData({
        data: {
          email: user.email,
          name: user.displayName,
          googlePhotoUrl: user.photoURL,
        },
      })
        .then(({ data }) => {
          setUserToStorage(data);
          updateContext({ profile: data });
          navigate('/');
        })
        .catch(handleAxiosError);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        handleError({ message: 'Something went wrong. Please try again later' });
      }
    }
  };

  return (
    <Button
      variant="outlined"
      disabled={loading}
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
