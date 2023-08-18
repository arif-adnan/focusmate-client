import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/bootstrap.css";
// import "./assets/css/bootstrap.min.css";
// import "./assets/css/bootstrap.min.css.map";
import App from './App';
import "./assets/css/animate.min.css";
import "./assets/css/style.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <App />
  </React.StrictMode>
);
