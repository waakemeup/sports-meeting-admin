import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import router, { unAuthRoutes } from "../router/router";
import Dashboard from "../views/dashboard/Dashboard";

interface Props {}

const View = (props: Props) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to={"/admin/dashboard"} />}
        />
        <Route path="/admin">
          {router.map((r) => {
            return (
              <Route
                path={r.path}
                index={r.index}
                key={r.key}
                element={r.component}
              />
            );
          })}
        </Route>
        {unAuthRoutes.map((r) => (
          <Route key={r.key} path={r.path} element={r.component} />
        ))}
      </Routes>
    </Router>
  );
};

export default View;
