import { Outlet } from "react-router-dom";
import "./App.css";
import { LangProvider } from "../hook/LangContext";
import { AuthProvider } from "../auth/AuthContext";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <LangProvider>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </SnackbarProvider>
    </LangProvider>
  );
}

export default App;
