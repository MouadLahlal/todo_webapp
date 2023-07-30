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
import { postNewTask } from '../api/tasks';
import Popup from './TaskPopup';
import { getAllLists } from '../api/lists';

export default function NewTaskModal() {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [list, setList] = useState("Inbox");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function req() {
      const response = await getAllLists();
      if (response.status) {
        setLists(response.content);
      }
    }
    req();
  }, []);

  const clearStates = () => {
    setTask("");
    setNote("");
    setDate("");
    setPriority("");
    setList("Inbox");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(task, note, date, priority, list);
    clearStates();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
          <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NEW TASK</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vero, quasi dolorem ex dolore exercitationem aperiam quaerat repellendus corporis cum autem laborum harum aut pariatur eos quos sit commodi!
                Necessitatibus, excepturi?
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="task"
                label="Task"
                type="text"
                autoComplete='off'
                fullWidth
                onChange={(event) => setTask(event.target.value)}
            />
            <TextField 
                autoFocus
                margin='dense'
                id='note'
                label='Note'
                type='text'
                fullWidth
                multiline
                onChange={(event) => setNote(event.target.value)}
            />
            <TextField
                margin='dense'
                id='date'
                type='date'
                fullWidth
                onChange={(event) => setDate(event.target.value)}
            />
            <TextField
                margin='dense'
                id="priority"
                select
                label="Priority"
                helperText=""
                defaultValue=""
                fullWidth
                onChange={(event) => setPriority(event.target.value)}
            >
                <MenuItem key={1} value={"LOW"}>
                    {"LOW"}
                </MenuItem>
                <MenuItem key={2} value={"MEDIUM"}>
                    {"MEDIUM"}
                </MenuItem>
                <MenuItem key={3} value={"HIGH"}>
                    {"HIGH"}
                </MenuItem>
            </TextField>
            <TextField
                margin='dense'
                id="list"
                select
                label="List"
                helperText=""
                defaultValue=""
                fullWidth
                onChange={(event) => setList(event.target.value)}
            >
                <MenuItem key={3} value={"Inbox"}>
                    {"Inbox"}
                </MenuItem>
                {lists.map((list) => {
                    return (
                        <MenuItem
                            key={list.idlist}
                            value={list.name}
                        >
                            {list.name}
                        </MenuItem>
                    )
                })}
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={handleClose}>Cancel</Button>
            {/*<Button onClick={handleClose}>Subscribe</Button>*/}
            <Popup task={{task, note, date, priority, list}} setModalOpen={setOpen} open={openPopup} setOpen={setOpenPopup} />
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