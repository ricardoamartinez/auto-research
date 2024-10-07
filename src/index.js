import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Keep the existing JavaScript
const card = document.querySelector('.glass-card');
const container = document.querySelector('.container');
const title = document.querySelector('.metallic-title');
const shineEffect = document.querySelector('.shine-effect');

// ... (rest of your existing JavaScript)

reportWebVitals();

