import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Table, Tag, Space, Card, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

interface OpeningInfo {
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
}

interface Props {
  openingList?: OpeningInfo[];
}

const Opening: React.FC<Props> = ({ openingList }: Props) => {
  // TODO: 先仿照数据,之后把它删了
  openingList = [
    {
      name: "第一届",
      theme: "快乐运动会",
      startDate: "开始时间",
      endDate: "结束时间",
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
        <div id="buttons">
          <Button icon={<FileTextOutlined />}>新建</Button>
          <Button></Button>
        </div>
      </Card>
    </>
  );
};

export default Opening;
