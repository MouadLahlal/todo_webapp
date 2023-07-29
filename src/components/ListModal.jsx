import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, IconButton, MenuItem, Snackbar } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect, useState } from 'react';
import Popup from './ListPopup';

export default function NewListModal() {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [list, setList] = useState("");

  const clearStates = () => {
    setList("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearStates();
  };

  return (
    <div style={{ display:"inline", marginLeft:"10px" }}>
      <IconButton onClick={handleClickOpen}>
          <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NEW LIST</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vero, quasi dolorem ex dolore exercitationem aperiam quaerat repellendus corporis cum autem laborum harum aut pariatur eos quos sit commodi!
                Necessitatibus, excepturi?
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="list"
                label="List name"
                type="text"
                autoComplete='off'
                fullWidth
                onChange={(event) => setList(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Popup  listName={list} setModalOpen={setOpen} open={openPopup} setOpen={setOpenPopup} />
        </DialogActions>
      </Dialog>
      <Snackbar open={openPopup} autoHideDuration={6000} onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }}>
        <Alert onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }} severity="success" sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
            Task created successfully
        </Alert>
      </Snackbar>
    </div>
  );
}