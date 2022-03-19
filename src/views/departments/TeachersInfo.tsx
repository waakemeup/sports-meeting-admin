import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const TeachersInfo = (props: Props) => {
  return (
    <>
      <ContentHeader info={"院系人员"} info2={"教师信息"} />
      <div>教师信息</div>
    </>
  );
};

export default TeachersInfo;
