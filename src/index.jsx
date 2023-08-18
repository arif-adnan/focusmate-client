import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/bootstrap.css";
// import "./assets/css/bootstrap.min.css";
// import "./assets/css/bootstrap.min.css.map";
import { Provider } from "react-redux";
import App from './App';
import "./assets/css/animate.min.css";
import "./assets/css/style.css";
import store from "./redux/store/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
