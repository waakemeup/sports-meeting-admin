import { Button, Divider, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../api";

interface PlayerInfo {
  id: number; //序号
  card_id: number; //学号
  name: string;
  project: string;
  line?: string; //分道信息
  grade?: string; //成绩信息
  rank?: string;
}

interface Props {
  id: string;
  operation?: boolean;
}

const ProjectUserList = ({ id, operation = false }: Props) => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const FetchData = async () => {
  //     const result = await axios
  //       .get(`/event/getparticuser`, {
  //         params: {
  //           id,
  //         },
  //       })
  //       .then((res) => res.data);

  //     setData(result);
  //   };
  //   FetchData();
  // }, [id]);

  const userList: PlayerInfo[] = [
    {
      id: 1,
      name: "司楠",
      card_id: 201624131202,
      project: "射击",
      grade: "12",
      line: "123",
      rank: "未排名",
    },
    {
      id: 2,
      name: "测试",
      card_id: 201624131202,
      project: "射击",
      grade: "12",
      line: "暂未分道",
      rank: "未排名",
    },
    {
      id: 3,
      name: "岳彩娥",
      card_id: 201624131202,
      project: "射击",
      grade: "54",
      rank: "12",
      line: "暂未分道",
    },
  ];

  return (
    <>
      <Table
        dataSource={userList}
        rowKey={(record) => record.id}
        scroll={{ x: 600 }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 10,
          total: userList.length,
        }}
      >
        <Table.Column title={"序号"} dataIndex={"id"} />
        <Table.Column title={"参赛人学号"} dataIndex={"card_id"} />
        <Table.Column title={"参赛人姓名"} dataIndex={"name"} />
        <Table.Column title={"参赛项目"} dataIndex={"project"} />
        <Table.Column title={"分道信息"} dataIndex={"line"} />
        <Table.Column title={"成绩"} dataIndex={"grade"} />
        <Table.Column title={"排名"} dataIndex={"rank"} />
        <Table.Column
          title={"操作"}
          render={() => (
            <Space>
              <Button className="bg-teal-300 rounded-2xl hover:bg-teal-500 hover:text-white">
                详细
              </Button>
              {operation && (
                <>
                  <Button className="bg-cyan-300 hover:bg-cyan-500 hover:text-white rounded-2xl">
                    修改
                  </Button>
                  <Button className="bg-red-300 hover:bg-red-500 hover:text-white rounded-2xl">
                    删除
                  </Button>
                </>
              )}
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default ProjectUserList;
