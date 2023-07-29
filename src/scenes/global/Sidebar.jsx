import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';

import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import TodayIcon from '@mui/icons-material/Today';
import { getAllLists } from "../../api/lists";
import NewListModal from "../../components/ListModal";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768 ? true : false);
  const [selected, setSelected] = useState(`${window.location.pathname.charAt(1).toUpperCase()}${window.location.pathname.replace("/", "").substring(1, window.location.pathname.length-1)}`);
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
          padding: "5px 35px 5px 5px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed} collapsedWidth={"40px"} >
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
                  Your Name
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
            />
            <Item
              title="Today"
              to="/today"
              icon={<TodayIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Important"
              to="/important"
              icon={<LabelOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
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
            />
            {lists.map((list) => {
              return (
                <Item
                  key={list.idlist}
                  title={list.name}
                  to={`/lists/${list.name}`}
                  icon={<FormatListBulletedOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
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