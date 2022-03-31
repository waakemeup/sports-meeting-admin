import { Layout, Menu, Avatar, Popover, Button, Divider } from "antd";
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import React, { useContext } from "react";
import SideBar from "../sidebar/SideBar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MyContent from "../popover/MyContent";
import ContentHeader from "../contentheader/CotentHeader";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import { AdminStoreContext } from "../../store/AdminStore";
import { AuthStoreContext } from "../../store/AuthStore";
import UnAuth from "../unauth/UnAuth";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface Props {}

interface children {
  title: string;
}

// const content = (
//   <div className="">
//     <div>Hello</div>
//     <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
//       <Button
//         type="primary"
//         className="p-1 text-center rounded-md bg-cyan-500"
//         onClick={() => {}}
//       >
//         修改密码
//       </Button>
//       <Button className="p-1 text-center bg-yellow-400 rounded-md">登出</Button>
//     </div>
//   </div>
// );

const AppLayout: React.FC<Props> = observer(({ children }) => {
  const navigate = useNavigate();

  const adminStore = useContext(AdminStoreContext);
  const authStore = useContext(AuthStoreContext);

  console.log(authStore);

  if (authStore.isAuth === false) {
    return <UnAuth />;
  }

  return (
    <>
      <Helmet>
        <title>运动会信息管理</title>
        <meta name="description" content="运动会信息管理主页" />
      </Helmet>
      <Layout className="h-screen">
        <SideBar />
        <Layout className="h-screen">
          <Header
            className="flex items-center justify-end site-layout-sub-header-background"
            style={{ padding: 0, backgroundColor: "skyblue" }}
          >
            <Popover
              placement="bottom"
              trigger={"click"}
              // title="title"
              content={<MyContent navigate={navigate} />}
            >
              <div
                id="popover"
                className="flex items-center justify-center hover:bg-sky-800 xxm:hidden hover:cursor-pointer"
              >
                <Avatar className="ml-2" />
                {/* TODO: pass username */}
                <div className="pr-2 ml-2 text-white">
                  {adminStore.admin.username}
                </div>
              </div>
            </Popover>
          </Header>
          {/* <div>HAHHA</div> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              // TODO: maybe this need to change
              className=" !bg-system-gray border-gray-200 drop-shadow-2xl rounded-2xl p-12"
              style={{ padding: 24, minHeight: "100%" }}
            >
              {/* <ContentHeader info={"test"} /> */}
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }} className="h-full"></Footer>
        </Layout>
      </Layout>
    </>
  );
});

export default AppLayout;
