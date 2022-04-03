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
  SnippetsOutlined,
  ApartmentOutlined,
  BarChartOutlined,
  OrderedListOutlined,
  PlusSquareOutlined,
  SkinFilled,
  UserSwitchOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Register from "../views/register/Register";

export interface ARouter {
  title: string;
  path: string;
  key: string;
  index?: boolean;
  component?: ReactNode;
  children?: ARouter[];
  icon?: ReactNode;
  limit?: [string?, string?, string?, string?]; //权限 0管理员 1裁判 2｜3学生或学院
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
const ManageOpening = lazy(() => import("../views/manage/Opening"));
const ManageProjects = lazy(() => import("../views/manage/Projects"));
const ScoreList = lazy(() => import("../views/manage/score/ScoreList"));
const ScoreRecord = lazy(() => import("../views/manage/score/ScoreRecord"));
const User = lazy(() => import("../views/manage/system/User"));
const Role = lazy(() => import("../views/manage/system/Role"));
const EventList = lazy(() => import("../views/participate/EventList"));
const MyEvent = lazy(() => import("../views/participate/MyEvent"));
// const Test = lazy(() => import("../components/layout/AppLayout"));

const router: ARouter[] = [
  {
    path: "/admin/main",
    title: "首页",
    key: "main",
    component: <Main />,
    icon: <HomeOutlined />,
    limit: ["0", "1", "2", "3"],
  },
  {
    path: "/admin/me",
    title: "我的信息",
    key: "myinfo",
    // component: <MeInfo />,
    icon: <UserOutlined />,
    limit: ["0", "1", "2", "3"],
    children: [
      {
        path: "/admin/me/info",
        title: "我的信息",
        key: "myinfodetail",
        component: <MeInfo />,
        icon: <UserOutlined />,
        limit: ["0", "1", "2", "3"],
      },
      {
        path: "/admin/me/changepassword",
        title: "修改密码",
        key: "changepassword",
        component: <ChangePassword />,
        icon: <KeyOutlined />,
        limit: ["0", "1", "2", "3"],
      },
    ],
  },
  {
    path: "/admin/sportsinfo",
    title: "运动信息",
    key: "sportsinfo",
    icon: <TableOutlined />,
    limit: ["0", "1", "2", "3"],
    children: [
      {
        path: "/admin/sportsinfo/openinginfo",
        title: "开幕信息",
        key: "opening",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        component: <Opening />,
        limit: ["0", "1", "2", "3"],
      },
      {
        path: "/admin/sportsinfo/event",
        title: "比赛项目信息",
        key: "event",
        icon: <HourglassTwoTone twoToneColor="#eb2f96" />,
        component: <Event />,
        limit: ["0", "1", "2", "3"],
      },
      {
        path: "/admin/sportsinfo/matches",
        title: "比赛成绩信息",
        key: "matchresult",
        icon: <ReconciliationTwoTone twoToneColor="#57cbd3" />,
        component: <MatchResult />,
        limit: ["0", "1", "2", "3"],
      },
    ],
  },
  {
    path: "/admin/departments",
    title: "院系人员",
    key: "departmentpeople",
    icon: <HddTwoTone />,
    limit: ["0"],
    children: [
      {
        path: "/admin/departments/students",
        title: "学生信息",
        key: "studentsinfo",
        icon: <RobotFilled />,
        component: <StudentsInfo />,
        limit: ["0"],
      },
      /*       {
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
      }, */
      {
        path: "/admin/departments/department",
        title: "院系信息",
        key: "departmentinfo",
        icon: <HddFilled />,
        component: <DepartmentInfo />,
        limit: ["0"],
      },
    ],
  },
  {
    path: "/admin/manage/opening",
    title: "开幕管理",
    key: "manageopening",
    component: <ManageOpening />,
    icon: <SnippetsOutlined />,
    limit: ["0"],
  },
  {
    path: "/admin/manage/projects",
    title: "项目管理",
    key: "manageprojects",
    component: <ManageProjects />,
    icon: <ApartmentOutlined />,
    limit: ["0"],
  },
  {
    path: "/admin/manage/score",
    title: "成绩管理",
    key: "managescore",
    icon: <BarChartOutlined />,
    limit: ["0", "1"],
    children: [
      {
        path: "/admin/manage/score/list",
        title: "成绩列表",
        key: "scorelist",
        component: <ScoreList />,
        icon: <OrderedListOutlined />,
        limit: ["0", "1"],
      },
      {
        path: "/admin/manage/score/record",
        title: "成绩录入",
        key: "scorerecord",
        component: <ScoreRecord />,
        icon: <PlusSquareOutlined />,
        limit: ["0", "1"],
      },
    ],
  },
  {
    path: "/admin/manage/system",
    title: "系统管理",
    key: "systemdesign",
    icon: <LaptopOutlined />,
    limit: ["0"],
    children: [
      {
        path: "/admin/manage/system/user",
        key: "systemuser",
        title: "用户管理",
        component: <User />,
        icon: <SkinFilled />,
        limit: ["0"],
      },
      {
        path: "/admin/manage/system/role",
        key: "systemuserrole",
        title: "角色管理",
        component: <Role />,
        icon: <UserSwitchOutlined />,
        limit: ["0"],
      },
    ],
  },
  {
    path: "/admin/participate",
    key: "participate",
    title: "参加比赛",
    icon: <TrophyOutlined />,
    limit: ["2", "3"],
    children: [
      {
        path: "/admin/participate/eventlist",
        key: "eventlist",
        title: "项目列表",
        icon: <UnorderedListOutlined />,
        component: <EventList />,
        limit: ["2", "3"],
      },
      {
        path: "/admin/participate/myevent",
        key: "myevent",
        title: "我的参赛",
        icon: <ScheduleOutlined />,
        component: <MyEvent />,
        limit: ["2", "3"],
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
    path: "register",
    title: "注册",
    key: "register",
    component: <Register />,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    component: <Page404 />,
  },
];

export default router;
