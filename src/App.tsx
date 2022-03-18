import React, { lazy, Suspense } from "react";
import { Button } from "antd";
// import Login from "./views/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./components/View";
// import Page404 from "./views/404/Page404";

// const Login = lazy(() => import("./views/login/Login"));
// const Page404 = lazy(() => import("./views/404/Page404"));
// const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<></>}>
          {/* <Routes>
            <Route path="/login" element={<Login />} key="login"></Route>
            <Route path="*" element={<Page404 />} key="404"></Route>
          </Routes> */}
          <View />
        </Suspense>
      </Router>
    </>
  );
}

export default App;
