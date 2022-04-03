import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const MyEvent = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>参加比赛 - 我的参赛</title>
        <meta name="description" content="参加比赛我的参赛列表" />
      </Helmet>
      <ContentHeader info={"参加比赛"} info2={"我的参赛"} />
    </>
  );
};

export default MyEvent;
