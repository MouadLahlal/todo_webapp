import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
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
  
  useEffect(() => {
    async function req() {
      const logged = await postCheckLogged();
      if (logged.status) {
        setIsLogged(true);
      }
    }
    req();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLogged
            ? 
              <>
                <Sidebar isSidebar={isSidebar} />
                <main className="content" style={{  maxHeight: "100%", overflowY: "scroll",}}>
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/important" element={<Important />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/lists/:list" element={<UList />} />
                    <Route path="*" element={<Dashboard />} />
                  </Routes>
                </main>
              </> 
            :
              <>
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/login" element={<Login setlogged={setIsLogged}/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Login setlogged={setIsLogged} />} />
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