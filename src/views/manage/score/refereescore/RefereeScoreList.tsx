import { Card } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../../components/contentheader/CotentHeader";

interface Props {}

const RefereeScoreList = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>成绩管理 - 成绩列表</title>
        <meta name="description" content="成绩管理成绩列表" />
      </Helmet>
      <ContentHeader info={"成绩管理"} info2={"成绩列表"} replace={true} />
      <Card
        title="我负责的比赛项目列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      ></Card>
    </>
  );
};

export default RefereeScoreList;
