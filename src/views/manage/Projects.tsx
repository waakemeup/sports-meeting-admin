import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const Projects = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>项目管理</title>
        <meta name="description" content="运动会项目管理" />
      </Helmet>
      <ContentHeader info={"项目管理"} />
      <div>项目管理</div>
    </>
  );
};

export default Projects;
