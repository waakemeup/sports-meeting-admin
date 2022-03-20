import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const SportOpening = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>运动信息 - 开幕式</title>
        <meta name="description" content="运动会开幕信息" />
      </Helmet>
      <ContentHeader info={"运动信息"} info2={"开幕式信息"} />
      <div>开幕式信息</div>
    </>
  );
};

export default SportOpening;
