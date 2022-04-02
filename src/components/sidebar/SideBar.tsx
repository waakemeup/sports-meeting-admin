import {
  DashboardOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import router, { ARouter } from "../../router/router";
import { observer } from "mobx-react-lite";
import { AdminStoreContext } from "../../store/AdminStore";
import * as bcrypt from "bcryptjs";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface Props {}

const SideBar = observer((props: Props) => {
  const adminStore = useContext(AdminStoreContext);

  // console.log(bcrypt.compareSync("3", adminStore.admin.role as string));
  const arr: string[] = ["0", "1", "2", "3"];

  let adminRole: undefined | string = undefined;
  for (let item of arr) {
    if (bcrypt.compareSync(item, adminStore.admin.role as string)) {
      adminRole = item;
      break;
    }
  }

  // console.log(adminRole);

  const generateMenu = (routerList?: ARouter[]) => {
    return (
      <>
        {routerList?.map((router) => {
          if (router.children) {
            if (!router.limit?.includes(adminRole)) {
              return null;
            }
            return (
              <SubMenu key={router.key} icon={router.icon} title={router.title}>
                {generateMenu(router.children)}
              </SubMenu>
            );
          } else {
            return (
              router.limit?.includes(adminRole) && (
                <Menu.Item key={router.key} icon={router.icon}>
                  <Link to={router.path}>{router.title}</Link>
                </Menu.Item>
              )
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
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
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
});

export default SideBar;
