import React from 'react';

import { useTheme } from '../../hooks/Theme';

import {
  ThemeProvider as ThemeProviderStyled,
} from 'styled-components'


const ThemeProvider: React.FC = ({
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <ThemeProviderStyled
      theme={theme}
      {...rest}
    />
  );
};

export default ThemeProvider;
