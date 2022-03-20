import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../components/contentheader/CotentHeader";
interface Props {}

const ScoreList = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>成绩管理 - 成绩列表</title>
        <meta name="description" content="成绩管理成绩列表" />
      </Helmet>
      <ContentHeader info={"成绩管理"} info2={"成绩列表"} />
      <div>成绩列表</div>
    </>
  );
};

export default ScoreList;
