import React, { memo } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const ClassInfo = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>院系人员 - 班级信息</title>
        <meta name="description" content="运动会院系人员班级信息" />
      </Helmet>
      <ContentHeader info={"院系人员"} info2={"班级信息"} />
      <div>班级信息</div>
    </>
  );
};

export default memo(ClassInfo);
