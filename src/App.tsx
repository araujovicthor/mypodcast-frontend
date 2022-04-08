import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes';

import { GlobalStyle } from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
