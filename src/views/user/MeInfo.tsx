import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const MeInfo = (props: Props) => {
  return (
    <>
      <ContentHeader info={"我的信息"} />
      <div>我的信息</div>
    </>
  );
};

export default MeInfo;
