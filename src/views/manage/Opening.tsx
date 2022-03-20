import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Table, Tag, Space, Card, Button, Popconfirm, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import FormModal from "../../components/modal/FormModal";
import clsx from "clsx";
import ChangeOpeningState from "../../components/opening/ChangeOpeningState";

const { Column, ColumnGroup } = Table;

interface OpeningInfo {
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
  id: number;
  key: number;
}

interface Props {
  openingList?: OpeningInfo[];
}

const Opening: React.FC<Props> = ({ openingList }: Props) => {
  // TODO: 先仿照数据,之后把它删了
  openingList = [
    {
      key: 1,
      id: 1,
      name: "第一届",
      theme: "快乐运动会",
      startDate: "一个开始时间",
      endDate: "一个结束时间",
    },
    {
      key: 2,
      id: 2,
      name: "第二届",
      theme: "快乐运动会",
      startDate: "一个开始时间",
      endDate: "一个结束时间",
    },
    {
      key: 3,
      id: 3,
      name: "第三届",
      theme: "快乐运动会",
      startDate: "一个开始时间",
      endDate: "一个结束时间",
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
          rowKey={"key"}
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
        </Table>
      </Card>
    </>
  );
};

export default Opening;
