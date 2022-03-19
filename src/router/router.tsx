import { lazy, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DashboardOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

export interface ARouter {
  title: string;
  path: string;
  key: string;
  index?: boolean;
  component: ReactNode;
  children?: ARouter[];
  icon?: ReactNode;
}

const Login = lazy(() => import("../views/login/Login"));
const Page404 = lazy(() => import("../views/404/Page404"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Main = lazy(() => import("../views/main/Main"));
// const Test = lazy(() => import("../components/layout/AppLayout"));

const router: ARouter[] = [
  {
    path: "/admin/dashboard",
    // index: true,
    title: "仪表盘",
    key: "dashboard",
    component: <Dashboard />,
    icon: <DashboardOutlined />,
  },
  {
    path: "/admin/main",
    title: "首页",
    key: "main",
    component: <Main />,
    icon: <HomeOutlined />,
  },
  // {
  //   path: "login",
  //   title: "登陆",
  //   key: "login",
  //   component: <Login />,
  // },
  // {
  //   path: "*",
  //   title: "404",
  //   key: "404",
  //   component: <Page404 />,
  // },
];

export const unAuthRoutes: ARouter[] = [
  {
    path: "login",
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
