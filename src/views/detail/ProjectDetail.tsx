import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Card, Descriptions, Button, Table } from "antd";
import ProjectUserList from "../../components/project/ProjectUserList";
import { ProjectInfo, OpeningInfo, RefereeInfo } from "../../types.d";
import axios from "../../api";

interface Props {}

const tabListNoTitle = [
  {
    key: "项目详细信息",
    tab: "项目详细信息",
  },
];

const _tabListNoTitle = [
  {
    key: "项目参赛名单",
    tab: "项目参赛名单",
  },
];

const ProjectDetail = (props: Props) => {
  const [info, setInfo] = useState<ProjectInfo>();
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);
  const [refereeData, setRefereeData] = useState<RefereeInfo[]>([]);

  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectInfo[]>(`/event/getdetail`, {
          params: { id },
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result2 = await axios
        .get<OpeningInfo[]>(`/getsportlist`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result3 = await axios
        .get<RefereeInfo[]>(`/referee/referees`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      // @ts-ignore
      setRefereeData(result3.data);

      // @ts-ignore
      setOpeningData(result2.data);

      // @ts-ignore
      setInfo(result.data);
    };
    FetchData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>项目详细信息</title>
        <meta name="description" content="项目详细信息" />
      </Helmet>
      <ContentHeader
        info={"项目管理"}
        info2={"项目详细信息"}
        function1={() => navigate("/admin/manage/projects")}
        canFunction1={true}
      />
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="届时">
            {
              openingData.filter((single) => single.id === info?.sportId)[0]
                ?.name
            }
          </Descriptions.Item>
          <Descriptions.Item label="项目名称">{info?.name}</Descriptions.Item>
          <Descriptions.Item label="项目举办地点">
            {info?.location}
          </Descriptions.Item>
          <Descriptions.Item label="项目性别限制">
            {info?.limit ? "女" : "男"}
          </Descriptions.Item>
          <Descriptions.Item label="项目举办日期">
            {info?.start}
          </Descriptions.Item>
          <Descriptions.Item label="报名开始时间">
            {info?.signStart}
          </Descriptions.Item>
          <Descriptions.Item label="报名结束时间">
            {info?.signEnd}
          </Descriptions.Item>
          <Descriptions.Item label="项目裁判">
            {
              refereeData.filter((single) => single.id === info?.refereeId)[0]
                ?.name
            }
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        className="border-t-4 rounded-sm border-t-blue-300"
        tabList={_tabListNoTitle}
      >
        {/* <FormModal /> */}
        <div className="mb-4">
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            刷新
          </Button>
        </div>
        <ProjectUserList id={id as string} />
      </Card>
    </>
  );
};

export default ProjectDetail;
