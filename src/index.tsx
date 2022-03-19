// import "dotenv-safe/config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// console.log(process.env.REACT_APP_API_URL);  TODO: it works

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById("root")
);
