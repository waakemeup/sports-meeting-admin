import { Button, Card, Space, Table } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import ChangeOpeningState from "../../components/opening/ChangeOpeningState";
import { useNavigate } from "react-router-dom";
import { OpeningInfo } from "../../types.d";

// interface OpeningInfo {
//   name: string;
//   theme: string;
//   startDate: string;
//   endDate: string;
//   id: number;
//   key?: number; //TODO:也许应该把这个删了
// }

interface Props {
  openingList?: OpeningInfo[];
}

const SportOpening = ({ openingList }: Props) => {
  const navigate = useNavigate();

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
        <title>运动信息 - 开幕式</title>
        <meta name="description" content="运动会开幕信息" />
      </Helmet>
      <ContentHeader info={"运动信息"} info2={"开幕式信息"} />
      <Card
        title="开幕信息记录"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
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
          <Table.Column title={"序号"} dataIndex={"id"} />
          <Table.Column title={"运动会名称"} dataIndex={"name"} />
          <Table.Column title={"运动会主题"} dataIndex={"theme"} />
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
                <Button
                  className="bg-green-300"
                  onClick={() =>
                    navigate(`/admin/detail/opening/${openingItem.id}`)
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

export default SportOpening;
