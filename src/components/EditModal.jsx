import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, IconButton, MenuItem, Snackbar } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useEffect, useState } from 'react';
import { getAllLists } from '../api/lists';
import { postEditTask } from '../api/tasks';

export default function EditTaskModal({taskOBJ, openPopup, setOpenPopup}) {
  const [open, setOpen] = useState(false);
  //const [openPopup, setOpenPopup] = useState(false);
  const [task, setTask] = useState(taskOBJ.task);
  const [note, setNote] = useState(taskOBJ.note);
  const [expiration, setExpiration] = useState(taskOBJ.expiration);
  const [priority, setPriority] = useState(taskOBJ.priority);
  const [list, setList] = useState(taskOBJ.list);
  const [lists, setLists] = useState([]);
  const [idtask, done] = [taskOBJ.idtask, taskOBJ.done];

  useEffect(() => {
    async function req() {
      const response = await getAllLists();
      if (response.status) {
        setLists(response.content);
      }
    }
    req();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const added = await postEditTask({idtask, task, note, expiration, priority, done, list});
    console.log(added);
    if (added.status) {
      setOpenPopup(true);
      setOpen(false);
    }
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen} edge="end" aria-label="edit" style={{ marginLeft : 10 }}>
          <EditOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT TASK</DialogTitle>
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
                value={task}
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
                value={note}
                onChange={(event) => setNote(event.target.value)}
            />
            <TextField
                margin='dense'
                id='expiration'
                type='date'
                fullWidth
                value={expiration}
                onChange={(event) => setExpiration(event.target.value)}
            />
            <TextField
                margin='dense'
                id="priority"
                select
                label="Priority"
                helperText=""
                defaultValue=""
                fullWidth
                value={priority}
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
                value={list}
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
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='outlined' onClick={handleSubmit} sx={{ marginLeft: '10px' }}>
              Open success snackbar
            </Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar open={openPopup} autoHideDuration={6000} onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }}>
        <Alert onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }} severity="success" sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
            Task modified successfully
        </Alert>
      </Snackbar> */}
    </div>
  );
}