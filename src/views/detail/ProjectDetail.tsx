import React from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const ProjectDetail = (props: Props) => {
  const navigate = useNavigate();

  // const { id } = useParams();
  return (
    <>
      <Helmet>
        <title>项目详细信息</title>
        {/* TODO:这里content 应该根据返回数据更具体一点*/}
        <meta name="description" content="项目详细信息" />
      </Helmet>
      <ContentHeader
        info={"项目管理"}
        info2={"项目详细信息"}
        function1={() => navigate("/admin/manage/projects")}
        canFunction1={true}
      />
    </>
  );
};

export default ProjectDetail;
