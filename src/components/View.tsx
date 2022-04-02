import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import router, { unAuthRoutes } from "../router/router";
import OpeningDetail from "../views/detail/OpeningDetail";
import PlayerGradeDetail from "../views/detail/PlayerGradeDetail";
import ProjectDetail from "../views/detail/ProjectDetail";
import AppLayout from "./layout/AppLayout";
import * as bcrypt from "bcryptjs";
import { AdminStoreContext } from "../store/AdminStore";
import { observer } from "mobx-react-lite";

interface Props {}

const View = observer((props: Props) => {
  const adminStore = useContext(AdminStoreContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to={"admin/main"} />} />
        <Route path="/admin/detail">
          <Route path="project">
            <Route
              path=":id"
              element={
                <AppLayout>
                  <ProjectDetail />
                </AppLayout>
              }
            />
          </Route>
          <Route path="opening">
            <Route
              path=":id"
              element={
                <AppLayout>
                  <OpeningDetail />
                </AppLayout>
              }
            />
          </Route>
          <Route path="grade">
            <Route
              path=":id"
              element={
                <AppLayout>
                  <PlayerGradeDetail />
                </AppLayout>
              }
            />
          </Route>
        </Route>
        <Route path="admin">
          {router.map((r) => {
            if (r.children) {
              return r.children.map((child) => (
                <Route
                  path={child.path}
                  index={child.index}
                  key={child.key}
                  element={<AppLayout>{child.component}</AppLayout>}
                />
              ));
            }
            return (
              <Route
                path={r.path}
                index={r.index}
                key={r.key}
                element={<AppLayout>{r.component}</AppLayout>}
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
});

export default View;
