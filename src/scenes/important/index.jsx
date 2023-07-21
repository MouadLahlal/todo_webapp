import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Header from "../../components/Header";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Fragment, useEffect, useState } from "react";
import { getImportantTask, postDone, postUndone } from "../../api/tasks";
import EditTaskModal from "../../components/EditModal";

const Important = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checked, setChecked] = useState([0]);
  const [tasks, setTasks] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const req = async () => {
      let response = await getImportantTask();
      setTasks(response.content);
    }
    
    req();
  }, []);

  const handleToggle = (task) => async () => {
    const currentIndex = checked.indexOf(task.task);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(task.task);
      const done = await postDone(task.idtask);
      task.done = 1;
      console.log(done);
    } else {
      newChecked.splice(currentIndex, 1);
      const undone = await postUndone(task.idtask);
      task.done = 0;
      console.log(undone);
    }

    setChecked(newChecked);
  };

  return (
    <Box m="20px">
      <Header title="IMPORTANT TASKS" subtitle="" />
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
            task.expiration = `${temp.getFullYear()}-${temp.getMonth() <= 8 ? "0":""}${temp.getMonth()+1}-${temp.getDate()}`;

            return (
              <ListItem
                key={task}
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
                      <Typography variant="h5" fontWeight="600" sx={{ textDecoration: task.done === 1 ? 'line-through' : '' }}>
                        {task.task}
                      </Typography>
                    </Fragment>
                  } secondary={
                    <Typography fontWeight="600"> {task.note} </Typography>
                  } />
                </ListItemButton>
              </ListItem>
            );
          })}
    </List>
      </Box>
    </Box>
  );
};

export default Important;