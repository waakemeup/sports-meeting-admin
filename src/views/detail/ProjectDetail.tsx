import React from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Card, Descriptions } from "antd";

interface ProjectInfo {
  sport_id: string;
  name: string;
  limit: number; //性别限制 0男 1女
  start: string;
  signStart: string;
  signEnd: string;
  refereeId: string;
  unit: string;
  id: number; //TODO:也许要把这个改名 eventId 或者 event_id
  location: string;
}

interface Props {}

const tabListNoTitle = [
  {
    key: "项目详细信息",
    tab: "项目详细信息",
  },
];

const ProjectDetail = (props: Props) => {
  // TODO: 此处应该改为Axios
  const project: ProjectInfo = {
    id: 0,
    limit: 0,
    sport_id: "2022",
    name: "100m接力赛",
    start: "2022-03-23 00:00:00",
    signStart: "2022-03-15 13:28:01",
    signEnd: "2022-03-25 00:33:00",
    refereeId: "1",
    unit: "秒",
    location: "西区操场",
  };

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
      <Card
        className="border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="届时">
            {project.sport_id + "届"}
          </Descriptions.Item>
          <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
          <Descriptions.Item label="项目举办地点">
            {project.location}
          </Descriptions.Item>
          <Descriptions.Item label="项目性别限制">
            {project.limit ? "女" : "男"}
          </Descriptions.Item>
          <Descriptions.Item label="项目举办日期">
            {project.start}
          </Descriptions.Item>
          <Descriptions.Item label="报名开始时间">
            {project.signStart}
          </Descriptions.Item>
          <Descriptions.Item label="报名结束时间">
            {project.signEnd}
          </Descriptions.Item>
          <Descriptions.Item label="项目裁判">
            {project.refereeId}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default ProjectDetail;
