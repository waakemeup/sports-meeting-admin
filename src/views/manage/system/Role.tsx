import React from "react";
import ContentHeader from "../../../components/contentheader/CotentHeader";

interface Props {}

const Role = (props: Props) => {
  return (
    <>
      <ContentHeader info={"系统管理"} info2={"角色管理"} />
      <div>角色管理</div>
    </>
  );
};

export default Role;
