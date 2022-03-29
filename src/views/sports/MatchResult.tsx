import { Button, Card, Input, Space, Table } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { PlayerGrade } from "../../types.d";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

interface Props {}

const MatchResult = (props: Props) => {
  const navigate = useNavigate();

  const playerGrades: PlayerGrade[] = [
    {
      id: 1,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 2,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 3,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 4,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 5,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 6,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 7,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 8,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 9,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 10,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 11,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
    {
      id: 12,
      card_id: "22318041",
      event_name: "跳高",
      grade: "2m",
      location: "西区操场",
      name: "小黑",
      sport_id: "2020",
    },
  ];

  return (
    <>
      <Helmet>
        <title>运动信息 - 成绩</title>
        <meta name="description" content="比赛成绩信息" />
      </Helmet>
      <ContentHeader info={"运动信息"} info2={"运动会成绩表"} replace={true} />
      <Card
        title="赛事成绩记录表"
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
      >
        <Table
          dataSource={playerGrades}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: playerGrades.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
            filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => {
              return (
                <Input
                  autoFocus
                  placeholder="Type Text Here"
                  value={selectedKeys[0]}
                  onChange={(e) => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                  }}
                  onPressEnter={() => {
                    confirm();
                  }}
                  onBlur={() => {
                    confirm();
                  }}
                ></Input>
              );
            }}
            filterIcon={() => <SearchOutlined />}
            onFilter={(value: any, record: any) => {
              return record.id === Number(value);
            }}
          />
          <Table.Column title={"届时"} dataIndex={"sport_id"} />
          <Table.Column title={"参赛人学号"} dataIndex={"card_id"} />
          <Table.Column title={"参赛人"} dataIndex={"name"} />
          <Table.Column title={"参赛项目"} dataIndex={"event_name"} />
          <Table.Column title={"比赛地点"} dataIndex={"location"} />
          <Table.Column title={"成绩"} dataIndex={"grade"} />

          <Table.Column
            title={"操作"}
            render={(playerGrade: PlayerGrade) => (
              <Space>
                <Button
                  className="bg-green-300"
                  onClick={() =>
                    navigate(`/admin/detail/grade/${playerGrade.id}`)
                  }
                >
                  详情
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default MatchResult;
