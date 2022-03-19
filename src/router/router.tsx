import { lazy, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DashboardOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";

export interface ARouter {
  title: string;
  path: string;
  key: string;
  index?: boolean;
  component?: ReactNode;
  children?: ARouter[];
  icon?: ReactNode;
}

const Login = lazy(() => import("../views/login/Login"));
const Page404 = lazy(() => import("../views/404/Page404"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Main = lazy(() => import("../views/main/Main"));
const MeInfo = lazy(() => import("../views/user/MeInfo"));
const ChangePassword = lazy(() => import("../views/user/ChangePassword"));
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
  {
    path: "/admin/me",
    title: "我的信息",
    key: "myinfo",
    // component: <MeInfo />,
    icon: <UserOutlined />,
    // index: true,
    children: [
      {
        path: "/admin/me/info",
        title: "我的信息",
        key: "myinfodetail",
        component: <MeInfo />,
        icon: <UserOutlined />,
      },
      {
        path: "/admin/me/changepassword",
        title: "修改密码",
        key: "changepassword",
        component: <ChangePassword />,
        icon: <KeyOutlined />,
      },
    ],
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
