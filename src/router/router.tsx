import { lazy, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

interface ARouter {
  title: string;
  path: string;
  key: string;
  index?: boolean;
  component: ReactNode;
  children?: ARouter[];
}

const Login = lazy(() => import("../views/login/Login"));
const Page404 = lazy(() => import("../views/404/Page404"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));

const router: ARouter[] = [
  {
    path: "/",
    index: true,
    title: "仪表盘",
    key: "dashboard",
    component: <Dashboard />,
  },
  {
    path: "/login",
    title: "登陆",
    key: "login",
    component: <Login />,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    component: <Page404 />,
  },
];

export default router;
