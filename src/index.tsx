// import "dotenv-safe/config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.min.css";
import { Provider } from "mobx-react";
// import { userStore } from "./store";

ReactDOM.render(
  // <React.StrictMode>
  <Provider>
    <App />
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);
