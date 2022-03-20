import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const MatchResult = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>运动信息 - 成绩</title>
        <meta name="description" content="比赛成绩信息" />
      </Helmet>
      <ContentHeader info={"运动信息"} info2={"运动会成绩表"} />
      <div>运动会成绩表</div>
    </>
  );
};

export default MatchResult;
