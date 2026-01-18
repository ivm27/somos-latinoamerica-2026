import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css'; // FIX: Removed /src/ so it finds the file in the root

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);