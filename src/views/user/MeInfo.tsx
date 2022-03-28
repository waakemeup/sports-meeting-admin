import React from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Helmet } from "react-helmet";
import { Card, Descriptions, Table } from "antd";

interface UserProjectInfo {
  id: number;
  sport_id: string;
  name: string;
  game_name: string;
  take_time: string; //参赛时间
  grade?: string; //成绩
}

interface Props {}

const tabListNoTitle = [
  {
    key: "我的信息",
    tab: "我的信息",
  },
];

const _tabListNoTitle = [
  {
    key: "参赛信息",
    tab: "参赛信息",
  },
];

// TODO:只有学生有这个
const JoinProject = () => {
  const takePartList: UserProjectInfo[] = [
    {
      id: 1,
      sport_id: "2020",
      name: "测试",
      game_name: "射击",
      take_time: "2020-01-18 15:24:47",
      grade: undefined,
    },
    {
      id: 2,
      sport_id: "2020",
      name: "测试",
      game_name: "三级跳远",
      take_time: "2020-01-18 15:24:47",
      grade: "100",
    },
  ];

  return (
    <Card
      className="my-8 border-t-4 rounded-sm border-t-blue-300"
      tabList={_tabListNoTitle}
    >
      <Table
        dataSource={takePartList}
        rowKey={(record) => record.id}
        scroll={{ x: 600 }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 5,
          total: 1,
        }}
      >
        <Table.Column title={"序号"} dataIndex={"id"} />
        <Table.Column title={"参加届时"} dataIndex={"sport_id"} />
        <Table.Column title={"参赛人"} dataIndex={"name"} />
        <Table.Column title={"参赛项目"} dataIndex={"game_name"} />
        <Table.Column title={"参赛时间"} dataIndex={"take_time"} />
        <Table.Column
          title={"成绩"}
          dataIndex={"grade"}
          render={(value) => (
            <>{typeof value === "undefined" ? "成绩未录入" : value}</>
          )}
        />
      </Table>
    </Card>
  );
};

const MeInfo = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>我的信息</title>
        <meta name="description" content="我的信息" />
      </Helmet>
      <ContentHeader info={"我的信息"} />
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="标识">{"admin"}</Descriptions.Item>
          <Descriptions.Item label="名称">{"管理员"}</Descriptions.Item>
        </Descriptions>
      </Card>
      <JoinProject />
    </>
  );
};

export default MeInfo;
