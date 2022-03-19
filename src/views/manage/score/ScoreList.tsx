import React from "react";
import ContentHeader from "../../../components/contentheader/CotentHeader";
interface Props {}

const ScoreList = (props: Props) => {
  return (
    <>
      <ContentHeader info={"成绩管理"} info2={"成绩列表"} />
      <div>成绩列表</div>
    </>
  );
};

export default ScoreList;
