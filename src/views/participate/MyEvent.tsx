import { Button, Card, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { ProjectInfo, ProjectTokenInfo, OpeningInfo } from "../../types";
import axios from "../../api";
import { SearchOutlined } from "@ant-design/icons";
import DetailProject from "../../components/project/DetailProject";
import qs from "qs";
import ExitProject from "../../components/project/ExitProject";

interface Props {}

const MyEvent = (props: Props) => {
  const [myListData, setMyListData] = useState<ProjectTokenInfo[]>([]);
  const [eventData, setEventData] = useState<ProjectInfo[]>([]);
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectTokenInfo[]>(`/user/getparticed`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result2 = await axios
        .get<ProjectInfo[]>(`/getevents`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result3 = await axios
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
      setEventData(result2.data);

      // @ts-ignore
      setOpeningData(result3.data);
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
          rowKey={(record) => record.eventId}
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
            dataIndex={"eventId"}
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = myListData.filter(
                      (item) => item.eventId === value
                    );

                    return myListData.indexOf(selected[0]) + 1;
                  })()}
                </>
              );
            }}
          />
          <Table.Column
            title={"届时"}
            dataIndex={"eventId"}
            render={(value) => (
              <>
                {
                  openingData.filter(
                    (opening) =>
                      opening.id ===
                      eventData.filter((single) => single.id === value)[0]
                        ?.sportId
                  )[0]?.name
                }
              </>
            )}
          />
          <Table.Column
            title={"项目名称"}
            dataIndex={"eventName"}
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
              return record.eventName
                .toLowerCase()
                .includes(value.toLowerCase());
            }}
          />
          <Table.Column
            title={"项目性别限制"}
            dataIndex={"eventId"}
            render={(value) => (
              <>
                {eventData.filter((single) => single.id === value)[0]?.limit
                  ? "女"
                  : "男"}
              </>
            )}
          />
          <Table.Column
            title={"项目举办地点"}
            dataIndex={"eventId"}
            render={(value) => (
              <>
                {eventData.filter((single) => single.id === value)[0]
                  ?.location ?? "未找到地址"}
              </>
            )}
          />
          <Table.Column
            title={"项目举办日期"}
            dataIndex={"eventId"}
            render={(value) => (
              <>
                {eventData.filter((single) => single.id === value)[0]?.start ??
                  "未找到举办日期"}
              </>
            )}
          />
          <Table.Column
            title={"分组信息"}
            dataIndex={"group"}
            render={(value) => <>{value ?? "暂未分组"}</>}
          />
          <Table.Column
            title={"比赛成绩"}
            render={(eventTokenInfo: ProjectTokenInfo) => (
              <>
                {eventTokenInfo.score === null
                  ? "未录入"
                  : eventTokenInfo.score + " " + eventTokenInfo.unit}
              </>
            )}
          />
          <Table.Column
            title={"比赛排名"}
            dataIndex={"rank"}
            render={(value) => <>{value ?? "暂未排名"}</>}
          />
          <Table.Column
            title={"操作"}
            render={(eventTokenInfo: ProjectTokenInfo) => {
              const id = eventData.filter(
                (single) => single.id === eventTokenInfo.eventId
              )[0]?.id;
              return (
                <Space>
                  <DetailProject id={id} />
                  <ExitProject
                    id={id}
                    setDeleteData={(data2) => setMyListData(data2)}
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Card>
    </>
  );
};

export default MyEvent;
