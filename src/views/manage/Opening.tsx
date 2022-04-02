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
import { AxiosResponse } from "axios";

const { Column, ColumnGroup } = Table;

interface OpeningInfo {
  name: string;
  them: string;
  startDate: string;
  endDate: string;
  id: string;
}

interface Props {}

const Opening: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState<OpeningInfo[]>([]);

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
      setData(result.data);

      console.log(data);
    };
    FetchData();
  }, []);

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
          dataSource={data}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: data.length,
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
          <Table.Column title={"举办时间"} dataIndex={"startdate"} />
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
                  theme={openingItem.them}
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
