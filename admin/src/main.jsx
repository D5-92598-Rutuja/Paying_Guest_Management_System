import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./redux/store";

import '@syncfusion/ej2-material-theme/styles/material.css';
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE || '');

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
