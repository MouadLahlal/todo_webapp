import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box, IconButton, MenuItem, Snackbar } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect, useState } from 'react';
import Popup from './EditListPopup';
import * as icons from '@mui/icons-material';
import { type } from '@testing-library/user-event/dist/type';
import { current } from '@reduxjs/toolkit';

export default function EditListModal({listName, currentIcon, open, setOpen}) {
  // const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [list, setList] = useState(listName);
  const [icon, setIcon] = useState(currentIcon);
  const [iconsArray, setIconsArray] = useState([]);

  
  useEffect(() => {
    let tempArray = [...iconsArray];
    let cont = 0;
    for (var icon in icons) {
      if (icon.endsWith('Outlined')) {
        tempArray.push(icon);
        cont++;
      }
      if (cont >= 100) break;
    }
    setIconsArray(tempArray);
  }, []);

  const Icon = ({desiredIcon}) => {
    const Temp = icons[desiredIcon];
    return ( <Temp /> )
  }

  const clearStates = () => {
    setList("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // clearStates();
  };

  return (
    <div style={{ display:"inline" }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT LIST</DialogTitle>
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
                value={list}
                onChange={(event) => setList(event.target.value)}
            />
            <TextField
              margin='dense'
              id=''
              select
              label='Icon'
              helperText=''
              defaultValue={''}
              fullWidth
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
              SelectProps={{
                MenuProps : {
                  sx: {
                    maxHeight: 300,
                    maxWidth : 300
                  }
                }
              }}
            >
              {iconsArray && iconsArray.map((anIcon) => {
                return (
                  <MenuItem 
                    key={anIcon.replace('icon', '')}
                    value={anIcon}
                    style={{
                      display: 'inline-block',
                      minWidth: 60
                    }}
                  >
                    <Icon desiredIcon={anIcon} />
                  </MenuItem>
                );
              })}
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={handleClose}>Cancel</Button>
            <Popup  oldlistName={listName} newlistName={list} newicon={icon} setModalOpen={setOpen} open={openPopup} setOpen={setOpenPopup} />
        </DialogActions>
      </Dialog>
      <Snackbar open={openPopup} autoHideDuration={6000} onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }}>
        <Alert onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }} severity="success" sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
            List edited successfully
        </Alert>
      </Snackbar>
    </div>
  );
}