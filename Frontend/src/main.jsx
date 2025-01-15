import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
 // Import your store here

 const persistor = persistStore(store);

 ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
         <App />
         <Toaster />
       </PersistGate>
     </Provider>
   </React.StrictMode>,
 );
