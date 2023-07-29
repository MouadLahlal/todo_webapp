import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import { getProgress, getStatistic } from "../../api/stats";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ progress, setProgress ] = useState({progress:0});
  const [ stats, setStats ] = useState({totTasks:0, todTasks:0, todCompTasks:0});

  useEffect(() => {
    const req = async () => {
      await setProgress(await getProgress());
      await setStats(await getStatistic());
    }

    req();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn={window.innerWidth <= 768 ? "span 12" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Your Progress
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="140" progress={progress.progress}/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {progress.compTasks} out of {progress.totTasks} task completed
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn={window.innerWidth <= 768 ? "span 12" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totTasks}
            subtitle="Total Tasks"
            progress="0.75"
            increase="+14%"
            icon={
              <AllInclusiveOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={window.innerWidth <= 768 ? "span 12" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.todTasks}
            subtitle="Today's Tasks"
            progress="0.50"
            increase="+21%"
            icon={
              <ListAltOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={window.innerWidth <= 768 ? "span 12" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.todCompTasks}
            subtitle="Today's Completed Tasks"
            progress="0.30"
            increase="+5%"
            icon={
              <LibraryAddCheckOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;