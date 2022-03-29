import { Button, Card, Form, FormInstance, Input, Space, Table } from "antd";
import axios from "../../api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import FormModal from "../../components/modal/FormModal";
import ChangeOpeningState from "../../components/opening/ChangeOpeningState";
import DeleteOpening from "../../components/opening/DeleteOpening";
import EditOpening from "../../components/opening/EditOpening";
import { SearchOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

interface OpeningInfo {
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
  id: number;
  key?: number; //TODO:也许应该把这个删了
}

interface Props {
  openingList?: OpeningInfo[];
}

const Opening: React.FC<Props> = ({ openingList }: Props) => {
  // TODO: 先仿照数据,之后把它删了

  // TODO: 应该是这个模板
  /*   const [data, setData] = useState<OpeningInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios.get(`/getsportlist`).then((res) => res.data);
      setData(result);
    };
    FetchData();
  }, []);
 */
  openingList = [
    {
      // key: 1,
      id: 1,
      name: "第一届",
      theme: "快乐运动会",
      startDate: "2022-03-01 21:09:32",
      endDate: "2022-03-18 21:09:33",
    },
    {
      // key: 2,
      id: 2,
      name: "第二届",
      theme: "快乐运动会",
      startDate: "2022-03-01 21:09:32",
      endDate: "2022-03-19 21:09:33",
    },
    {
      // key: 3,
      id: 3,
      name: "第三届",
      theme: "快乐运动会",
      startDate: "2022-03-01 21:09:32",
      endDate: "2022-03-20 21:09:33",
    },
  ];

  return (
    <>
      <Helmet>
        <title>开幕管理</title>
        <meta name="description" content="运动会开幕管理" />
      </Helmet>
      <ContentHeader info={"开幕管理"} />
      <Card
        title="开幕信息记录"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <div id="buttons" className="mb-4">
          <FormModal />
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            刷新
          </Button>
        </div>
        <Table
          dataSource={openingList}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: openingList.length,
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
          <Table.Column
            title={"运动会主题"}
            dataIndex={"theme"}
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
              return record.theme.toLowerCase().includes(value.toLowerCase());
            }}
          />
          <Table.Column title={"举办时间"} dataIndex={"startDate"} />
          <Table.Column
            title={"状态"}
            render={(openingItem: OpeningInfo) => (
              <ChangeOpeningState id={openingItem.id} />
            )}
          />
          <Table.Column
            title={"操作"}
            render={(openingItem: OpeningInfo) => (
              <Space>
                <EditOpening
                  id={openingItem.id}
                  name={openingItem.name}
                  endDate={openingItem.endDate}
                  startDate={openingItem.startDate}
                  theme={openingItem.theme}
                />
                <DeleteOpening id={openingItem.id} />
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default Opening;
