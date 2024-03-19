import { useState } from 'react';
import useAxios from 'axios-hooks';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';

import { handleAxiosError } from '../../../../utils/error';
import { handleSuccess } from '../../../../utils/success';
import { removeUserFromStorage } from '../../../../utils/auth';

const DeletePostControl = ({ title, id, update }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [{ loading }, deleteUser] = useAxios({
    url: `api/recipe/delete/${id}`,
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
        handleSuccess(data);
        update();
      })
      .catch(handleAxiosError);

  return (
    <>
      <IconButton aria-label="Delete recipe" onClick={() => setIsOpen(true)}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Delete recipe</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete recipe <b>{title}</b>?
          </Typography>
          <Typography>You won't be able to undo this action.</Typography>
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

export default DeletePostControl;
