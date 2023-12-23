import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import './global-styles.scss';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
