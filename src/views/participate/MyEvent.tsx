import { Button, Card, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { OpeningInfo, ProjectInfo } from "../../types";
import axios from "../../api";
import { SearchOutlined } from "@ant-design/icons";
import DetailProject from "../../components/project/DetailProject";
import qs from "qs";
import ExitProject from "../../components/project/ExitProject";

interface Props {}

const MyEvent = (props: Props) => {
  const [myListData, setMyListData] = useState<ProjectInfo[]>([]);
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectInfo[]>(`/user/getparticed`, {
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
      // @ts-ignore
      setMyListData(result.data);

      // @ts-ignore
      setOpeningData(result2.data);
    };
    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>参加比赛 - 我的参赛</title>
        <meta name="description" content="参加比赛我的参赛列表" />
      </Helmet>
      <ContentHeader info={"参加比赛"} info2={"我的参赛"} replace={true} />
      <Card
        title="我的参赛列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <Table
          rowKey={(record) => record.id}
          dataSource={myListData}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: myListData.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = myListData.filter(
                      (item) => item.id === value
                    );

                    return myListData.indexOf(selected[0]) + 1;
                  })()}
                </>
              );
            }}
          />
          <Table.Column
            title={"届时"}
            dataIndex={"sportId"}
            render={(value) => (
              <>
                {openingData.filter((single) => single.id === value)[0]?.name ??
                  "未找到运动会"}
              </>
            )}
          />
          <Table.Column
            title={"项目名称"}
            dataIndex={"name"}
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
              return record.name.toLowerCase().includes(value.toLowerCase());
            }}
          />
          <Table.Column
            title={"项目性别限制"}
            dataIndex={"limit"}
            render={(value: string) => <>{parseInt(value) ? "女" : "男"}</>}
          />
          <Table.Column title={"项目举办地点"} dataIndex={"location"} />
          <Table.Column title={"项目举办日期"} dataIndex={"start"} />
          <Table.Column
            title={"操作"}
            render={(eventInfo: ProjectInfo) => (
              <Space>
                <DetailProject id={eventInfo.id} />
                <ExitProject
                  id={eventInfo.id}
                  setDeleteData={(data2) => setMyListData(data2)}
                />
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default MyEvent;
