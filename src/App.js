import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Today from "./scenes/today";
import Login from "./scenes/auth/login";
import Signup from "./scenes/auth/signup";
import { postCheckLogged } from "./api/auth";
import Important from "./scenes/important";
import UList from "./scenes/list";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [selected, setSelected] = useState(`${window.location.pathname.charAt(1).toUpperCase()}${window.location.pathname.replace("/", "").substring(1, window.location.pathname.length-1)}`);
  const location = useLocation();
  
  useEffect(() => {
    async function req() {
      const logged = await postCheckLogged();
      if (logged.ok) {
        setIsLogged(true);
      }
    }
    req();
  }, []);

  useEffect(() => {
    let page = `${location.pathname.charAt(1).toUpperCase()}${location.pathname.replace("/", "").substring(1, location.pathname.length-1)}`
    // let page = location.pathname.substring(location.pathname.lastIndexOf('/')+1, location.pathname.length).replaceAll('%20', " ")
    setSelected(page);
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLogged
            ? 
              <>
                <Sidebar isSidebar={isSidebar} selected={selected} setSelected={setSelected} />
                <main className="content" style={{  maxHeight: "100%", overflowY: "scroll",}}>
                  <Topbar setIsSidebar={setIsSidebar} logged={isLogged} />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/important" element={<Important />} />
                    <Route path="/lists/:list" element={<UList />} />
                    <Route path="*" element={<Navigate to={'/dashboard'} replace />} />
                  </Routes>
                </main>
              </> 
            :
              <>
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} logged={isLogged} />
                  <Routes>
                    <Route path="/login" element={<Login setlogged={setIsLogged}/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Navigate to={'/login'} replace />} />
                  </Routes>
                </main>
              </>
          }
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
