import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Table } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/contentheader/CotentHeader";
import DetailProject from "../../components/project/DetailProject";

interface EventInfo {
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

const Event = (props: Props) => {
  const navigate = useNavigate();

  const eventList: EventInfo[] = [
    {
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
    },
    {
      id: 1,
      limit: 1,
      sport_id: "2022",
      name: "射击",
      start: "2022-03-23 00:00:00",
      signStart: "2022-03-15 13:28:01",
      signEnd: "2022-03-25 00:33:00",
      refereeId: "1",
      unit: "分",
      location: "西区操场",
    },
    {
      id: 2,
      limit: 0,
      sport_id: "2022",
      name: "三级跳远",
      start: "2022-03-23 00:00:01",
      signStart: "2022-04-10 13:28:01",
      signEnd: "2022-04-22 00:33:00",
      refereeId: "1",
      unit: "米",
      location: "东区操场",
    },
  ];

  return (
    <>
      <Helmet>
        <title>运动信息 - 项目</title>
        <meta name="description" content="比赛项目信息" />
      </Helmet>
      <ContentHeader info={"比赛项目信息"} />
      <Card
        title="项目列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <Table
          dataSource={eventList}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 10,
            total: eventList.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
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
              return record.id === Number(value);
            }}
          />
          <Table.Column
            title={"届时"}
            dataIndex={"sport_id"}
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
              return record.sport_id
                .toLowerCase()
                .includes(value.toLowerCase());
            }}
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
            title={"性别限制"}
            render={(event: EventInfo) => <>{event.limit ? "女" : "男"}</>}
          />
          <Table.Column title={"项目举办地点"} dataIndex={"location"} />
          <Table.Column title={"项目举办日期"} dataIndex={"start"} />
          <Table.Column
            title={"操作"}
            render={(eventInfo: EventInfo) => (
              <DetailProject id={eventInfo.id} />
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default Event;
