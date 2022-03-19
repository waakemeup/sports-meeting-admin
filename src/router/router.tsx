import { lazy, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DashboardOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  KeyOutlined,
  TableOutlined,
  CheckCircleTwoTone,
  HourglassTwoTone,
  ReconciliationTwoTone,
  HddTwoTone,
  RobotFilled,
  IdcardFilled,
  TeamOutlined,
  HddFilled,
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
const Opening = lazy(() => import("../views/sports/SportOpening"));
const Event = lazy(() => import("../views/sports/Event"));
const MatchResult = lazy(() => import("../views/sports/MatchResult"));
const StudentsInfo = lazy(() => import("../views/departments/StudentsInfo"));
const TeachersInfo = lazy(() => import("../views/departments/TeachersInfo"));
const ClassInfo = lazy(() => import("../views/departments/ClassInfo"));
const DepartmentInfo = lazy(
  () => import("../views/departments/DepartmentInfo")
);
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
  {
    path: "/admin/sportsinfo",
    title: "运动信息",
    key: "sportsinfo",
    icon: <TableOutlined />,
    children: [
      {
        path: "/admin/sportsinfo/openinginfo",
        title: "开幕信息",
        key: "opening",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        component: <Opening />,
      },
      {
        path: "/admin/sportsinfo/event",
        title: "比赛项目信息",
        key: "event",
        icon: <HourglassTwoTone twoToneColor="#eb2f96" />,
        component: <Event />,
      },
      {
        path: "/admin/sportsinfo/matches",
        title: "比赛成绩信息",
        key: "matchresult",
        icon: <ReconciliationTwoTone twoToneColor="#57cbd3" />,
        component: <MatchResult />,
      },
    ],
  },
  {
    path: "/admin/departments",
    title: "院系人员",
    key: "departmentpeople",
    icon: <HddTwoTone />,
    children: [
      {
        path: "/admin/departments/students",
        title: "学生信息",
        key: "studentsinfo",
        icon: <RobotFilled />,
        component: <StudentsInfo />,
      },
      {
        path: "/admin/departments/teachers",
        title: "教师信息",
        key: "teachersinfo",
        icon: <IdcardFilled />,
        component: <TeachersInfo />,
      },
      {
        path: "/admin/departments/classes",
        title: "班级信息",
        key: "classinfo",
        icon: <TeamOutlined />,
        component: <ClassInfo />,
      },
      {
        path: "/admin/departments/department",
        title: "院系信息",
        key: "departmentinfo",
        icon: <HddFilled />,
        component: <DepartmentInfo />,
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
