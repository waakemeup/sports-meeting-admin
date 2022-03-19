import React from "react";
import ContentHeader from "../../../components/contentheader/CotentHeader";

interface Props {}

const User = (props: Props) => {
  return (
    <>
      <ContentHeader info={"系统管理"} info2={"用户管理"} />
      <div>系统用户管理</div>
    </>
  );
};

export default User;
