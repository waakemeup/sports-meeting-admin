import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const SportOpening = (props: Props) => {
  return (
    <>
      <ContentHeader info={"运动信息"} info2={"开幕式信息"} />
      <div>开幕式信息</div>
    </>
  );
};

export default SportOpening;
