import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import { putEditList } from '../api/lists';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Popup({oldlistName, newlistName, setModalOpen, open, setOpen}) {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async () => {
    const added = await putEditList(oldlistName, newlistName);
    console.log(added);
    if (added.ok) {
      setOpen(true);
      setModalOpen(false);
    }
  }

  return (
    <Stack>
      <Button variant='contained' onClick={handleSubmit} sx={{ marginLeft: '10px' }}>
        OK
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
          List edited successfully
        </Alert>
      </Snackbar>
    </Stack>
  );
}