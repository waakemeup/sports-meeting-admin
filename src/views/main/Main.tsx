import React from "react";
import { Helmet } from "react-helmet";

interface Props {}

const Main = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>管理系统-首页</title>
        <meta name="description" content="运动会信息管理后台首页" />
      </Helmet>
      <div className="flex items-center justify-center text-5xl">
        这是一个首页
      </div>
    </>
  );
};

export default Main;
