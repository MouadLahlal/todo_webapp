import { Alert, Box, Snackbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Fragment, useEffect, useState } from "react";
import { getListTasks, postDone, postEditTask, postUndone } from "../../api/tasks";
import { useParams } from "react-router-dom";
import EditTaskModal from "../../components/EditModal";

const UList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checked, setChecked] = useState([0]);
  const [tasks, setTasks] = useState([]);
  const [listName, setListName] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const params = useParams();

  useEffect(() => {
    let name = params.list;
    if (name != listName) {
      handleListChange();
      setListName(name);
    }
  });

  const handleListChange = async () => {
    let response = await getListTasks(params.list);
    setTasks(response.body.content);
    if (response.body.content) {
      response.body.content.map((task) => {
        if (task.done === 1) {
          const newChecked = [...checked];
          newChecked.push(task.task);
          setChecked(newChecked);
        }
      })
    }
  }

  const handleToggle = (task) => async () => {
    const currentIndex = checked.indexOf(task.task);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(task.task);
      const done = await postDone(task.idtask);
      task.done = 1;
    } else {
      newChecked.splice(currentIndex, 1);
      const undone = await postUndone(task.idtask);
      task.done = 0;
    }

    setChecked(newChecked);
  };

  const handleEdit = async () => {
  }

  return (
    <Box m="20px">
      <Header title={params.list.toUpperCase()} subtitle="" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {tasks && tasks.map((task) => {
            const labelId = task.idtask;
            let temp = new Date(task.expiration);
            task.expiration = `${temp.getFullYear()}-${temp.getMonth() <= 8 ? "0":""}${temp.getMonth()+1}-${temp.getDate() <= 8 ? "0":""}${temp.getDate()}`;

            return (
              <ListItem
                key={labelId}
                secondaryAction={
                  <>
                    <EditTaskModal taskOBJ={task} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                  </>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(task)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      //checked={checked.indexOf(task.task) !== -1}
                      checked={task.done === 0 ? false : true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={ 
                    <Fragment>
                      <Typography variant="h4" fontWeight="900" sx={{ textDecoration: task.done === 1 ? 'line-through' : '' }}>
                        {task.task}
                      </Typography>
                    </Fragment>
                  } secondary={
                    <Typography fontWeight="100"> {task.note} </Typography>
                  } sx={{ marginLeft: "-30px" }} />
                </ListItemButton>
                <Snackbar open={openPopup} autoHideDuration={6000} onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }}>
                  <Alert onClose={(event, reason) => { if (reason === 'clickaway') { return; } setOpenPopup(false) }} severity="success" sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
                      Task modified successfully
                  </Alert>
                </Snackbar>
              </ListItem>
            );
          })}
    </List>
      </Box>
    </Box>
  );
};

export default UList;