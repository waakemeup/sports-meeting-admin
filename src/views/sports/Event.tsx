import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const Event = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>运动信息 - 项目</title>
        <meta name="description" content="比赛项目信息" />
      </Helmet>
      <ContentHeader info={"运动信息"} info2={"比赛项目信息"} />
      <div>比赛项目信息</div>
    </>
  );
};

export default Event;
