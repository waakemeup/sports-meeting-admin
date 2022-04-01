import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../components/contentheader/CotentHeader";
import { observer } from "mobx-react-lite";
import { UserStoreContext } from "../../../store/UserStore";
import { Button } from "antd";
import { AdminStoreContext } from "../../../store/AdminStore";

interface Props {}

const User = observer((props: Props) => {
  const userStore = useContext(UserStoreContext);
  const adminStore = useContext(AdminStoreContext);

  return (
    <>
      <Helmet>
        <title>系统管理 - 用户管理</title>
        <meta name="description" content="系统管理用户管理" />
      </Helmet>
      <ContentHeader info={"系统管理"} info2={"用户管理"} />
      <div>用户管理</div>
    </>
  );
});

export default User;
