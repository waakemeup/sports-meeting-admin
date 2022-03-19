import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const ChangePassword = (props: Props) => {
  return (
    <>
      <ContentHeader info={"我的信息"} info2={"修改密码"} />
      <div>修改密码</div>
    </>
  );
};

export default ChangePassword;
