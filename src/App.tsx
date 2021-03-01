import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from './styles/themes'
import GlobalStyle from './styles/global';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>

          <GlobalStyle />
        </ThemeProvider>
      </AppProvider>
    </>
  )
};

export default App;
