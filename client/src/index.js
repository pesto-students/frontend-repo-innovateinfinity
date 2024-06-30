import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from 'react-toastify';
import App from "./App";
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </Provider>,
  document.getElementById("root"));

reportWebVitals();
