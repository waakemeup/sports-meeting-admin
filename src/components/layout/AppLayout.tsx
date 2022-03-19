import { Layout, Menu, Avatar, Popover, Button } from "antd";
import "antd/dist/antd.css";
import React from "react";
import SideBar from "../sidebar/SideBar";
import "./index.css";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface Props {}

const content = (
  <div className="">
    <div>Hello</div>
    <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
      <Button type="primary" className="p-1 text-center rounded-md bg-cyan-500">
        修改密码
      </Button>
      <Button className="p-1 text-center bg-yellow-400 rounded-md">登出</Button>
    </div>
  </div>
);

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="h-screen">
      <SideBar />
      <Layout>
        <Header
          className="flex items-center justify-end site-layout-sub-header-background"
          style={{ padding: 0, backgroundColor: "skyblue" }}
        >
          <Popover
            placement="bottom"
            trigger={"click"}
            // title="title"
            content={content}
          >
            <div
              id="popover"
              className="flex items-center justify-center hover:bg-sky-800 xxm:hidden"
            >
              <Avatar className="ml-2" />
              {/* TODO: pass username */}
              <div className="pr-2 ml-2 text-white">username</div>
            </div>
          </Popover>
        </Header>
        {/* <div>HAHHA</div> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: "100%" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

{
  /* <Layout>
  <Header className="header">
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  </Header>
  <Layout>
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          icon={<NotificationOutlined />}
          title="subnav 3"
        >
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  </Layout>
</Layout> */
}
