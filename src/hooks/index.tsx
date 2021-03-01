import React from 'react';

import { AuthProvider } from './Auth';
import { ThemeProvider } from './Theme';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default AppProvider;
