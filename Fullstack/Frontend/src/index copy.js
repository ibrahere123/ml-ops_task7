import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'; // Your styles
import App from './App';  // This imports your App.js component
import reportWebVitals from './reportWebVitals'; // Optional, for performance reporting

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This is where the React app is mounted
);

reportWebVitals();
