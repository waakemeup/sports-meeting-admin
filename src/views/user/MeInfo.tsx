import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Helmet } from "react-helmet";

interface Props {}

const MeInfo = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>我的信息</title>
        <meta name="description" content="我的信息" />
      </Helmet>
      <ContentHeader info={"我的信息"} />
      <div>我的信息</div>
    </>
  );
};

export default MeInfo;
