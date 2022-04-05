import { Button, Card } from "antd";
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
      <Card
        title="角色列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      ></Card>
    </>
  );
};

export default Role;
