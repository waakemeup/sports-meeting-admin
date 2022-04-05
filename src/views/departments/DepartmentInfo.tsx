import { Card } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const DepartmentInfo = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>院系人员 - 院系信息</title>
        <meta name="description" content="运动会院系人员院系信息" />
      </Helmet>
      <ContentHeader info={"院系人员"} info2={"院系信息"} />
      <Card
        title="院系信息"
        className="border-t-4 rounded-sm border-t-blue-300"
      ></Card>
    </>
  );
};

export default DepartmentInfo;
