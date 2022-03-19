import React from "react";
import ContentHeader from "../../../components/contentheader/CotentHeader";

interface Props {}

const ScoreRecord = (props: Props) => {
  return (
    <>
      <ContentHeader info={"成绩管理"} info2={"成绩录入"} />
      <div>成绩录入</div>
    </>
  );
};

export default ScoreRecord;
