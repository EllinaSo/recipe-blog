import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

import { useContextData } from '../../../../context';
import { handleAxiosError } from '../../../../utils/error';
import { handleSuccess } from '../../../../utils/success';
import { removeUserFromStorage } from '../../../../utils/auth';

const DeleteAccountControl = () => {
  const navigate = useNavigate();
  const {
    updateContext,
    profile: { _id: id },
  } = useContextData();

  const [isOpen, setIsOpen] = useState(false);

  const [{ loading }, deleteUser] = useAxios({
    url: `api/user/delete/${id}`,
    method: 'DELETE',
  });

  const handleClose = () => {
    if (!loading) {
      setIsOpen(false);
    }
  };

  const handleDelete = () =>
    deleteUser()
      .then(({ data }) => {
        removeUserFromStorage();
        updateContext({ profile: null });
        navigate('/');
        console.log(data);
        handleSuccess(data);
      })
      .catch(handleAxiosError);

  return (
    <>
      <Link component="button" type="button" onClick={() => setIsOpen(true)}>
        Delete account
      </Link>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? </Typography>
          <Typography>You can sign up again later.</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={loading}
            endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAccountControl;
