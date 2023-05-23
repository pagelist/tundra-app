import '@total-typescript/ts-reset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import '../styles/main.css';

import '../server/create-server.js';

const container = document.getElementById('root');
if (!container) {
  throw new Error('no container to render to');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
