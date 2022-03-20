import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const TeachersInfo = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>院系人员 - 教师信息</title>
        <meta name="description" content="运动会院系人员教师信息" />
      </Helmet>
      <ContentHeader info={"院系人员"} info2={"教师信息"} />
      <div>教师信息</div>
    </>
  );
};

export default TeachersInfo;
