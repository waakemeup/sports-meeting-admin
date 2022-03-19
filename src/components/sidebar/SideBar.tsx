import {
  DashboardOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import router, { ARouter } from "../../router/router";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface Props {}

const SideBar = (props: Props) => {
  const generateMenu = (routerList?: ARouter[]) => {
    return (
      <>
        {routerList?.map((router) => {
          if (router.children) {
            return (
              <SubMenu key={router.key} icon={router.icon} title={router.title}>
                {generateMenu(router.children)}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={router.key} icon={router.icon}>
                <Link to={router.path}>{router.title}</Link>
              </Menu.Item>
            );
          }
        })}
      </>
    );
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">运动会信息管理</div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {generateMenu(router)}
      </Menu>
    </Sider>
  );
};

export default SideBar;
