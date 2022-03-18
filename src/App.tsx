import React, { lazy, Suspense } from "react";
import { Button } from "antd";
// import Login from "./views/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./views/login/Login"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
