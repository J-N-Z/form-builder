import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { LIGHT_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={LIGHT_THEME}>
        <DropdownProvider>
          <FontsVTBGroup />
          <App />
        </DropdownProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
