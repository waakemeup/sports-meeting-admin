import React, { useEffect, useState, memo } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { OpeningInfo } from "../../types";
import { Button, Card, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import clsx from "clsx";

interface Props {}

const EventList = memo((props: Props) => {
  const navigate = useNavigate();

  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<OpeningInfo[]>(`/getsportlist`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);
      // @ts-ignore
      setOpeningData(result.data);
    };
    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>参加比赛 - 项目列表</title>
        <meta name="description" content="参加比赛项目列表" />
      </Helmet>
      <ContentHeader info={"参加比赛"} info2={"项目列表"} replace={true} />
      <Card
        title="正在进行的运动会"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <Table
          dataSource={openingData.filter((opening) => opening.status == 1)}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: openingData.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = openingData.filter(
                      (item) => item.id === value
                    );

                    return openingData.indexOf(selected[0]) + 1;
                  })()}
                </>
              );
            }}
          />
          <Table.Column
            title={"运动会名称"}
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
          <Table.Column title={"运动会主题"} dataIndex={"theme"} />
          <Table.Column title={"举办时间"} dataIndex={"startdate"} />
          <Table.Column
            title={"状态"}
            render={(openingItem: OpeningInfo) => (
              <Button
                className={clsx(
                  openingItem.status && ["bg-teal-400", "hover:bg-teal-600"],
                  !openingItem.status && ["bg-red-400", "hover:bg-red-600"],
                  "rounded-2xl",
                  "font-bold"
                )}
              >
                {openingItem.status ? "正在开展中..." : "已经结束啦!!!"}
              </Button>
            )}
          />
          <Table.Column
            title={"操作"}
            render={(openingItem: OpeningInfo) => (
              <Space>
                <Button
                  className="bg-green-300 hover:bg-green-400 hover:text-white"
                  onClick={() =>
                    navigate(`/admin/events/select/${openingItem.id}`)
                  }
                >
                  查看选择项目
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
});

export default EventList;
