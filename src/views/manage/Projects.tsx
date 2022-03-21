import { Button, Card } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import ProjectModal from "../../components/modal/ProjectModal";

interface Props {}

const Projects = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>项目管理</title>
        <meta name="description" content="运动会项目管理" />
      </Helmet>
      <ContentHeader info={"项目管理"} />
      <Card
        title="项目列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <div id="buttons" className="mb-4">
          <ProjectModal />
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            刷新
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Projects;
