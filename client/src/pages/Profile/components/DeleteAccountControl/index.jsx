import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';

const DeleteAccountControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

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
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAccountControl;
