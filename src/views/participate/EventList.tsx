import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const EventList = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>参加比赛 - 项目列表</title>
        <meta name="description" content="参加比赛项目列表" />
      </Helmet>
      <ContentHeader info={"参加比赛"} info2={"项目列表"} />
    </>
  );
};

export default EventList;
