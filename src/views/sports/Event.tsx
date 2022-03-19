import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const Event = (props: Props) => {
  return (
    <>
      <ContentHeader info={"运动信息"} info2={"比赛项目信息"} />
      <div>比赛项目信息</div>
    </>
  );
};

export default Event;
