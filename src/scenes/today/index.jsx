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
import { getTodaysTask } from "../../api/stats";

const Today = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checked, setChecked] = useState([0]);
  const [tasks, setTasks] = useState([]);
  const [visibleNote, setVisibleNote] = useState(new Map());

  useEffect(() => {
    const req = async () => {
      let response = await getTodaysTask();
      setTasks(response.content);
    }
    
    req();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleNoteVisibility = (idtask) => {
    const map = visibleNote;
    map.get(idtask) ? map.set(idtask, false) : map.set(idtask, true);
    setVisibleNote(map);
    console.log(visibleNote);
  }

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
            visibleNote.set(task.idtask, true);

            return (
              <ListItem
                key={task}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" style={{ marginRight: 10 }}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="expandMore" onClick={() => { handleNoteVisibility(task.idtask) }}>
                      {task.noteVisible ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(task.task)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(task.task) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={ 
                    <Fragment>
                      <Typography variant="h5" fontWeight="600">
                        {task.task}
                      </Typography>
                    </Fragment>
                  } secondary={
                    visibleNote.get(task.idtask) ? <><Typography variant="h6" fontWeight="600"> {task.note} </Typography></> : <></>
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

export default Today;