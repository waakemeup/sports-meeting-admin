import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const StudentsInfo = (props: Props) => {
  return (
    <>
      <ContentHeader info={"院系人员"} info2={"学生信息"} />
      <div>学生信息</div>
    </>
  );
};

export default StudentsInfo;
