import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../components/contentheader/CotentHeader";

interface Props {}

const User = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>系统管理 - 用户管理</title>
        <meta name="description" content="系统管理用户管理" />
      </Helmet>
      <ContentHeader info={"系统管理"} info2={"用户管理"} />
      <div>系统用户管理</div>
    </>
  );
};

export default User;
