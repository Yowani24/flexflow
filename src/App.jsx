import { Outlet } from "react-router-dom";
import "./App.css";
import { LangProvider } from "../hook/LangContext";
import { AuthProvider } from "../auth/AuthContext";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes/ThemeProps";
import styled from "styled-components";
import { useState } from "react";
import useFetchData from "../hook/useFetchData";

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

function App() {
  const { isDarkTheme } = useFetchData();

  return (
    // <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    // <AppContainer>
    <LangProvider>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </SnackbarProvider>
    </LangProvider>
    // </AppContainer>
    // </ThemeProvider>
  );
}

export default App;
