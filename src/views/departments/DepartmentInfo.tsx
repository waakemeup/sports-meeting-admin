import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const DepartmentInfo = (props: Props) => {
  return (
    <>
      <ContentHeader info={"院系人员"} info2={"院系信息"} />
      <div>院系信息</div>
    </>
  );
};

export default DepartmentInfo;
