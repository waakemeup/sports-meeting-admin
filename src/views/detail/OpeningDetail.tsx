import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Table } from "antd";
import { OpeningInfo } from "../../types.d";

interface Props {}

const tabListNoTitle = [
  {
    key: "开幕式详细信息",
    tab: "开幕式详细信息",
  },
];

const OpeningDetail = (props: Props) => {
  const navigate = useNavigate();

  const opening: OpeningInfo = {
    id: "1",
    endDate: "2022-03-25 00:33:00",
    startDate: "2022-03-10 00:33:00",
    location: "体育馆",
    name: "快乐运动会",
    sport_id: "2020",
    status: true,
    theme: "快乐",
  };

  return (
    <>
      <Helmet>
        <title>开幕式详细信息</title>
        {/* TODO:这里content 应该根据返回数据更具体一点*/}
        <meta name="description" content="开幕式详细信息" />
      </Helmet>
      <ContentHeader
        info={"运动会开幕列表"}
        info2={"开幕信息详情"}
        function1={() => navigate("/admin/sportsinfo/openinginfo")}
        canFunction1={true}
        replace={true}
      />
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="届时">
            {opening.sport_id + "届"}
          </Descriptions.Item>
          <Descriptions.Item label="名称">{opening.name}</Descriptions.Item>
          <Descriptions.Item label="举办地点">
            {opening.location}
          </Descriptions.Item>
          <Descriptions.Item label="举办时间">
            {opening.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="开始时间">
            {opening.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="结束时间">
            {opening.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="举办地">
            {opening.location}
          </Descriptions.Item>
          <Descriptions.Item label="主题">{opening.theme}</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default OpeningDetail;
