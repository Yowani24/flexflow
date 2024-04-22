import { Outlet } from "react-router-dom";
import "./App.css";
import { LangProvider } from "../hook/LangContext";
import { AuthProvider } from "../auth/AuthContext";

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </LangProvider>
  );
}

export default App;
