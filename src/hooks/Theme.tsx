import React, { createContext, useCallback, useState, useContext } from 'react';
import { DefaultTheme } from 'styled-components'
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(dark);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
    console.log(theme.title === 'light' ? dark : light);
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
