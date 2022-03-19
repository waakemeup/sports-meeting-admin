import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const MatchResult = (props: Props) => {
  return (
    <>
      <ContentHeader info={"运动信息"} info2={"运动会成绩表"} />
      <div>运动会成绩表</div>
    </>
  );
};

export default MatchResult;
