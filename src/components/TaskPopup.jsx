import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import { postNewTask } from '../api/tasks';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Popup({task, setModalOpen, open, setOpen}) {
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
    const added = await postNewTask(task.task, task.note, task.date, task.priority, task.list);
    console.log(added);
    if (added.status) {
      setOpen(true);
      setModalOpen(false);
    }
  }

  return (
    <Stack>
      <Button variant='outlined' onClick={handleSubmit} sx={{ marginLeft: '10px' }}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Stack>
  );
}