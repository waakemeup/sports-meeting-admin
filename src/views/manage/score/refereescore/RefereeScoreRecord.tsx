import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../../components/contentheader/CotentHeader";

interface Props {}

const RefereeScoreRecord = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>成绩管理 - 成绩录入</title>
        <meta name="description" content="成绩管理成绩录入" />
      </Helmet>
      <ContentHeader info={"成绩管理"} info2={"成绩录入"} />
      <div>成绩录入</div>
    </>
  );
};

export default RefereeScoreRecord;
