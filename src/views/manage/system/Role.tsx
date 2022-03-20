import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../components/contentheader/CotentHeader";

interface Props {}

const Role = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>系统管理 - 角色管理</title>
        <meta name="description" content="系统管理角色管理" />
      </Helmet>
      <ContentHeader info={"系统管理"} info2={"角色管理"} />
      <div>角色管理</div>
    </>
  );
};

export default Role;
