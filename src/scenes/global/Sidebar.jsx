import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import * as icons from '@mui/icons-material';

import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import TodayIcon from '@mui/icons-material/Today';
import { getAllLists } from "../../api/lists";
import NewListModal from "../../components/ListModal";
import EditListModal from "../../components/EditListModal";

const Item = ({ title, to, icon, iconString, selected, setSelected, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cleanSelected, setCleanSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    setSelected(title);
    navigate(to);
    if (e.type === 'click') {
      if (window.innerWidth <= 768) await setIsCollapsed(true);
    } else if (e.type === 'contextmenu') {
      if (e.target.pathname !== '/dashboard' 
          && e.target.pathname !== '/today' 
          && e.target.pathname !== '/important' 
          && e.target.pathname !== '/lists/Inbox') {
        setModalOpen(true);
      } else {
        handleClick({type : 'click', preventDefault: e.preventDefault});
      }
    }
    // if (window.innerWidth <= 768) await setIsCollapsed(true);
  }
  useEffect(() => {
    setCleanSelected(selected.substring(selected.lastIndexOf('/')+1, selected.length).replaceAll('%20', " "));
  }, [selected]);
  return (
    <MenuItem
      active={cleanSelected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={handleClick}
      onContextMenu={handleClick}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
      <EditListModal listName={title} currentIcon={iconString} open={modalOpen} setOpen={setModalOpen} />
    </MenuItem>
  );
};

const Sidebar = ({selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768 ? true : false);
  // const [selected, setSelected] = useState(`${window.location.pathname.charAt(1).toUpperCase()}${window.location.pathname.replace("/", "").substring(1, window.location.pathname.length-1)}`);
  const [lists, setLists] = useState([]);

  const Icon = ({desiredIcon}) => {
    const Temp = icons[desiredIcon];
    return ( <Temp /> )
  }

  useEffect(() => {
    async function req() {
      const response = await getAllLists();
      if (response.ok) {
        setLists(response.body.content);
      }
    }
    req();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          // padding: "5px 35px 5px 20px !important",
          padding: window.innerWidth <= 768 ? "5px 35px 5px 5px !important" : "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed} collapsedWidth={window.innerWidth <= 768 ? "45px" : ""} width={window.innerWidth <= 768 ? window.innerWidth : ""}  >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TODOCAST
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Welcome { localStorage.getItem('username').toUpperCase() }
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setIsCollapsed={setIsCollapsed}
            />
            <Item
              title="Today"
              to="/today"
              icon={<TodayIcon />}
              selected={selected}
              setSelected={setSelected}
              setIsCollapsed={setIsCollapsed}
            />
            <Item
              title="Important"
              to="/important"
              icon={<LabelOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setIsCollapsed={setIsCollapsed}
            />

            {!isCollapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px", fontSize:"18px" }}
            >
              Your Lists
              <NewListModal />
            </Typography>
            }

            <Item
              key={0}
              title={"Inbox"}
              to={`/lists/Inbox`}
              icon={<MoveToInboxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setIsCollapsed={setIsCollapsed}
            />
            {lists.map((list) => {
              return (
                <Item
                  key={list.idlist}
                  title={list.name}
                  to={`/lists/${list.name}`}
                  // icon={<FormatListBulletedOutlinedIcon />}
                  icon={<Icon desiredIcon={list.icon} />}
                  iconString={list.icon}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}
                />
              )
            })}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;