import React, { memo } from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const ClassInfo = (props: Props) => {
  return (
    <>
      <ContentHeader info={"院系人员"} info2={"班级信息"} />
      <div>班级信息</div>
    </>
  );
};

export default memo(ClassInfo);
