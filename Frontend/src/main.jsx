import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import store from "../redux/store"
 // Import your store here

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
      <Toaster />
  </React.StrictMode>
);
