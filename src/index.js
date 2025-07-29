import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

// Clear the existing HTML content
document.getElementById('root').innerHTML = '';

// Create root
const root = createRoot(document.getElementById('root'));

// Initial render
root.render(
  <Provider store={store}>
    <App />
  </Provider>
); 