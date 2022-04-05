import { Button, Divider, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../api";
import { ProjectTokenInfo } from "../../types.d";

interface Props {
  id: string;
  operation?: boolean;
}

const ProjectUserList = ({ id, operation = false }: Props) => {
  const [userData, setUserData] = useState<ProjectTokenInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectTokenInfo[]>(`/event/getmatch`, {
          params: {
            eventId: id,
          },
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      // @ts-ignore
      setUserData(result.data);
    };
    FetchData();
  }, []);

  return (
    <>
      <Table
        dataSource={userData}
        rowKey={(record) => record.athletesId}
        scroll={{ x: 600 }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 10,
          total: userData.length,
        }}
      >
        <Table.Column
          title={"序号"}
          dataIndex={"athletesId"}
          render={(value): JSX.Element => {
            return (
              <>
                {(() => {
                  const selected = userData.filter(
                    (item) => item.athletesId === value
                  );

                  return userData.indexOf(selected[0]) + 1;
                })()}
              </>
            );
          }}
        />
        <Table.Column title={"参赛人学号"} dataIndex={"studentNo"} />
        <Table.Column title={"参赛人姓名"} dataIndex={"studentName"} />
        <Table.Column title={"参赛项目"} dataIndex={"eventName"} />
        <Table.Column
          title={"分道信息"}
          dataIndex={"group"}
          render={(value) => <>{value ?? "暂未分道"}</>}
        />
        <Table.Column
          title={"成绩"}
          render={(data: ProjectTokenInfo) => (
            <>{data.score === null ? "未录入" : data.score + " " + data.unit}</>
          )}
        />
        <Table.Column
          title={"排名"}
          dataIndex={"rank"}
          render={(value) => <>{value ?? "暂未排名"}</>}
        />
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
