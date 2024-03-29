import { Outlet } from "react-router-dom";
import "./App.css";
import { LangProvider } from "../hook/LangContext";

function App() {
  return (
    <LangProvider>
      <Outlet />
    </LangProvider>
  );
}

export default App;
