import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../themes/ThemeProps";
import ThemeToggle from "../../themes/ThemeToggle";
import styled from "styled-components";

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const ThemeTeste = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContainer>
        <div>
          <h1>Hello, World!</h1>
          <ThemeToggle toggleTheme={toggleTheme} />
        </div>
      </AppContainer>
    </ThemeProvider>
  );
};

export default ThemeTeste;
