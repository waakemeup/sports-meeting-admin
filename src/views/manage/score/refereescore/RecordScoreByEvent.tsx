import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../../components/contentheader/CotentHeader";
import { useParams } from "react-router-dom";
import axios from "../../../../api";
import { ProjectTokenInfo } from "../../../../types";
import { observer } from "mobx-react-lite";
import { AdminStoreContext } from "../../../../store/AdminStore";
import * as bcrypt from "bcryptjs";
import UnAuth2 from "../../../../components/unauth/UnAuth2";
import { Button, Card, Input, Space, Table } from "antd";
import RecordScore from "../../../../components/record/RecordScore";
import { SearchOutlined } from "@ant-design/icons";

interface Props {}

const RecordScoreByEvent = observer((props: Props) => {
  const [tokenData, setTokenData] = useState<ProjectTokenInfo[]>([]);

  const adminStore = useContext(AdminStoreContext);

  const arr: string[] = ["2", "3"];

  let adminRole: undefined | string = undefined;

  for (let item of arr) {
    if (bcrypt.compareSync(item, adminStore.admin.role as string)) {
      adminRole = item;
      break;
    }
  }

  if (adminRole === "2" || adminRole === "3") {
    return <UnAuth2 />;
  }

  const { id } = useParams();

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
      setTokenData(result.data);
    };
    FetchData();
  }, []);

  // console.log(tokenData);

  return (
    <>
      <Helmet>
        <title>成绩管理 - 成绩录入</title>
        <meta name="description" content="成绩管理成绩录入" />
      </Helmet>
      <ContentHeader info={"成绩管理"} info2={"成绩录入"} />
      <Card
        title={tokenData[0]?.eventName ?? "暂时没有运动员参赛"}
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <Table
          dataSource={tokenData}
          rowKey={(record) => record.athletesId}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: tokenData.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"athletesId"}
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = tokenData.filter(
                      (item) => item.athletesId === value
                    );

                    return tokenData.indexOf(selected[0]) + 1;
                  })()}
                </>
              );
            }}
          />
          <Table.Column
            title={"参赛人学号"}
            dataIndex={"studentNo"}
            filterDropdown={({
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
            }) => {
              return (
                <>
                  <Input
                    autoFocus
                    placeholder="Type Text Here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                      confirm({
                        closeDropdown: false,
                      });
                    }}
                    onPressEnter={() => {
                      confirm();
                    }}
                    onBlur={() => {
                      confirm();
                    }}
                  ></Input>
                  <div className="flex items-center justify-between flex-grow">
                    <Button
                      onClick={() => confirm()}
                      type="primary"
                      className="bg-blue-400"
                    >
                      Search
                    </Button>
                    <Button
                      onClick={() => {
                        clearFilters!();
                        confirm();
                      }}
                      type="ghost"
                      className="bg-yellow-400"
                    >
                      Reset
                    </Button>
                  </div>
                </>
              );
            }}
            filterIcon={() => <SearchOutlined />}
            onFilter={(value: any, record: any) => {
              return record.studentNo
                .toLowerCase()
                .includes(value.toLowerCase());
            }}
          />
          <Table.Column
            title={"参赛人姓名"}
            dataIndex={"studentName"}
            filterDropdown={({
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
            }) => {
              return (
                <>
                  <Input
                    autoFocus
                    placeholder="Type Text Here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                      confirm({
                        closeDropdown: false,
                      });
                    }}
                    onPressEnter={() => {
                      confirm();
                    }}
                    onBlur={() => {
                      confirm();
                    }}
                  ></Input>
                  <div className="flex items-center justify-between flex-grow">
                    <Button
                      onClick={() => confirm()}
                      type="primary"
                      className="bg-blue-400"
                    >
                      Search
                    </Button>
                    <Button
                      onClick={() => {
                        clearFilters!();
                        confirm();
                      }}
                      type="ghost"
                      className="bg-yellow-400"
                    >
                      Reset
                    </Button>
                  </div>
                </>
              );
            }}
            filterIcon={() => <SearchOutlined />}
            onFilter={(value: any, record: any) => {
              return record.studentName
                .toLowerCase()
                .includes(value.toLowerCase());
            }}
          />
          <Table.Column
            title={"分道信息"}
            dataIndex={"group"}
            render={(value) => <>{value === null ? "暂未分道" : value}</>}
          />
          <Table.Column
            title={"成绩"}
            render={(data: ProjectTokenInfo) => (
              <>
                {data.score === null ? "未录入" : data.score + " " + data.unit}
              </>
            )}
          />
          <Table.Column
            title={"排名"}
            dataIndex={"rank"}
            render={(value) => <>{value === null ? "未排名" : value}</>}
          />
          <Table.Column
            title={"操作"}
            render={(projectTokenItem: ProjectTokenInfo) => {
              // console.log(projectTokenItem);
              return (
                <Space>
                  <RecordScore
                    athletesId={projectTokenItem.athletesId}
                    eventId={projectTokenItem.eventId}
                    score={projectTokenItem.score}
                    unit={projectTokenItem.unit}
                    studentNo={projectTokenItem.studentNo}
                    eventName={projectTokenItem.eventName}
                    studentName={projectTokenItem.studentName}
                    record={projectTokenItem.rank}
                    setChangeData={(data2) => setTokenData(data2)}
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Card>
    </>
  );
});

export default RecordScoreByEvent;
