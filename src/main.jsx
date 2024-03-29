import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login.jsx";
import EntryPage from "./pages/EntryPage.jsx";
import Showcase from "./pages/Showcase.jsx";
import Register from "./pages/Register.jsx";
import Protected from "../Protected.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<Showcase />} />
      </Route>
      <Route path="/" element={<Protected />}>
        <Route path="entry" element={<EntryPage />} />
      </Route>

      <Route path="*" element={<>Essa página não existe!</>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
