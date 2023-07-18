import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/team" element={<Today />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
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
