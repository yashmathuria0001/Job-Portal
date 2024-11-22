import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Toaster } from 'sonner';

 // Import your store here

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <App />
      <Toaster />
  </React.StrictMode>
);
