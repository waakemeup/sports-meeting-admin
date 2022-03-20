import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const ChangePassword = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>我的信息 - 修改密码</title>
        <meta name="description" content="我的信息 修改密码" />
      </Helmet>
      <ContentHeader info={"我的信息"} info2={"修改密码"} />
      <div>修改密码</div>
    </>
  );
};

export default ChangePassword;
