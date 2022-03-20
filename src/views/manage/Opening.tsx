import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const Opening = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>开幕管理</title>
        <meta name="description" content="运动会开幕管理" />
      </Helmet>
      <ContentHeader info={"开幕管理"} />
      <div>开幕管理</div>
    </>
  );
};

export default Opening;
