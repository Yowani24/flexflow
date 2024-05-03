import React from "react";
import styled from "styled-components";

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
`;

const ThemeToggle: React.FC<{ toggleTheme: () => void }> = ({
  toggleTheme,
}) => <ToggleButton onClick={toggleTheme}>Toggle Theme</ToggleButton>;

export default ThemeToggle;
