/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

import { colors } from "@/libs/styled-components/colors";

const storageKey = "Theme";

const ThemeContext = createContext<{ theme: { colors: typeof colors } } | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = {
    colors,
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
