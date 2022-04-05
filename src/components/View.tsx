import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import router, { unAuthRoutes } from "../router/router";
import OpeningDetail from "../views/detail/OpeningDetail";
import PlayerGradeDetail from "../views/detail/PlayerGradeDetail";
import ProjectDetail from "../views/detail/ProjectDetail";
import AppLayout from "./layout/AppLayout";
import * as bcrypt from "bcryptjs";
import { AdminStoreContext } from "../store/AdminStore";
import { observer } from "mobx-react-lite";
import UnAuth from "./unauth/UnAuth";
import SelectEvent from "../views/participate/SelectEvent";
import RecordScoreByEvent from "../views/manage/score/refereescore/RecordScoreByEvent";
import EventInfoDetail from "../views/detail/EventInfoDetail";

interface Props {}

const View = observer((props: Props) => {
  const adminStore = useContext(AdminStoreContext);
  const arr: string[] = ["0", "1", "2", "3", "4"];

  let adminRole: undefined | string = undefined;

  for (let item of arr) {
    if (bcrypt.compareSync(item, adminStore.admin.role as string)) {
      adminRole = item;
      break;
    }
  }

  // console.log("adminRole:", adminRole);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to={"login"} />} />
        <Route path="/admin/events">
          <Route path="select">
            <Route
              path=":id"
              element={
                <AppLayout>
                  <SelectEvent />
                </AppLayout>
              }
            />
          </Route>
        </Route>
        <Route path="/admin/manage/referee">
          <Route path="record">
            <Route
              path=":id"
              element={
                <AppLayout>
                  <RecordScoreByEvent />
                </AppLayout>
              }
            />
          </Route>
        </Route>
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
          <Route path="eventinfo">
            <Route
              path=":id" //参赛项目ID
              element={
                <AppLayout>
                  <EventInfoDetail />
                </AppLayout>
              }
            />
          </Route>
        </Route>
        <Route path="admin">
          {router.map((r) => {
            if (r.children) {
              if (!r.limit?.includes(adminRole)) {
                return null;
              }
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
              r.limit?.includes(adminRole) && (
                <Route
                  path={r.path}
                  index={r.index}
                  key={r.key}
                  element={<AppLayout>{r.component}</AppLayout>}
                />
              )
            );
          })}
        </Route>
        {/* {unAuthRoutes.map((r) =>
          r.key === "404" && adminRole === "4" ? (
            <Route key={"unAuth"} path={r.path} element={<UnAuth />} />
          ) : (
            <Route key={r.key} path={r.path} element={r.component} />
          )
        )} */}
        {unAuthRoutes.map((r) => (
          <Route key={r.key} path={r.path} element={r.component} />
        ))}
      </Routes>
    </Router>
  );
});

export default View;
