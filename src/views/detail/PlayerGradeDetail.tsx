import React from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Card, Descriptions, Button, Table } from "antd";
// TODO: 先写死，之后改

interface Props {}

const tabListNoTitle = [
  {
    key: "成绩",
    tab: "成绩",
  },
];

const _tabListNoTitle = [
  {
    key: "参赛人信息",
    tab: "参赛人信息",
  },
];

const __tabListNoTitle = [
  {
    key: "参赛项目信息",
    tab: "参赛项目信息",
  },
];

const PlayerGradeDetail = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>赛事成绩详细信息</title>
        <meta name="description" content="赛事成绩详细信息" />
      </Helmet>
      <ContentHeader
        info={"运动会成绩单"}
        info2={"运动会成绩信息详情"}
        function1={() => navigate("/admin/sportsinfo/matches")}
        canFunction1={true}
        replace={true}
      />
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="赛事成绩">{"2m"}</Descriptions.Item>
          <Descriptions.Item label="排名">{"2"}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={_tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="学号">{"201213412"}</Descriptions.Item>
          <Descriptions.Item label="姓名">{"小黑"}</Descriptions.Item>
          <Descriptions.Item label="性别">{"男"}</Descriptions.Item>
          <Descriptions.Item label="班级">{"2班"}</Descriptions.Item>
          <Descriptions.Item label="学院">{"不知名学院"}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={__tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="参赛届时">{"2020"}</Descriptions.Item>
          <Descriptions.Item label="项目名称">{"跳高"}</Descriptions.Item>
          <Descriptions.Item label="项目举办地点">
            {"西区操场"}
          </Descriptions.Item>
          <Descriptions.Item label="项目性别限制">{"男"}</Descriptions.Item>
          <Descriptions.Item label="项目比赛时间">
            {"2020-04-13 13:14:07"}
          </Descriptions.Item>
          <Descriptions.Item label="项目比赛时间">
            {"2020-04-13 13:14:07"}
          </Descriptions.Item>
          <Descriptions.Item label="项目裁判ID">
            {"201624131224"}
          </Descriptions.Item>
          <Descriptions.Item label="报名结束时间">
            {"2020-04-13 13:14:07"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default PlayerGradeDetail;
