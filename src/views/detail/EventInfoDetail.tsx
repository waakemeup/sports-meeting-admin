import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { useParams, useLocation } from "react-router-dom";
import { Card, Descriptions } from "antd";
import { ProjectInfo, OpeningInfo, RefereeInfo } from "../../types.d";
import axios from "../../api";

interface Props {}

const tabListNoTitle = [
  {
    key: "成绩信息",
    tab: "成绩信息",
  },
];

const _tabListNoTitle = [
  {
    key: "参赛人信息",
    tab: "参赛人信息",
  },
];

const __tabListNoTitle = [
  {
    key: "参赛项目信息",
    tab: "参赛项目信息",
  },
];

const EventInfoDetail = (props: Props) => {
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);
  const [refereeData, setRefereeData] = useState<RefereeInfo[]>([]);

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

      const result2 = await axios
        .get<RefereeInfo>(`/referee/referees`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      // @ts-ignore
      setOpeningData(result.data);

      // @ts-ignore
      setRefereeData(result2.data);
    };

    FetchData();
  }, []);

  console.log(refereeData);

  const { id } = useParams();

  const { state } = useLocation();

  const { eventInfo, rank, score, studentName, studentNo, unit } = state as any;

  console.log(eventInfo, rank, score, studentName, studentNo, unit);

  return (
    <>
      <Helmet>
        <title>参赛详细信息</title>
        <meta name="description" content="参赛详细信息" />
      </Helmet>
      <ContentHeader info={"参赛详细信息"} />
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="赛事成绩">
            {score !== null ? score + unit : "未录入"}
          </Descriptions.Item>
          <Descriptions.Item label="排名">
            {rank === null ? "暂未排名" : rank}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={_tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="学号">{studentNo}</Descriptions.Item>
          <Descriptions.Item label="姓名">{studentName}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={__tabListNoTitle}
      >
        <Descriptions bordered>
          <Descriptions.Item label="参赛届时">
            {
              openingData.filter(
                (opening) => opening.id === eventInfo?.sportId
              )[0]?.name
            }
          </Descriptions.Item>
          <Descriptions.Item label="项目名称">
            {eventInfo?.name}
          </Descriptions.Item>
          <Descriptions.Item label="项目举办地点">
            {eventInfo?.location}
          </Descriptions.Item>
          <Descriptions.Item label="项目性别限制">
            {parseInt(eventInfo?.limit) ? "女" : "男"}
          </Descriptions.Item>
          <Descriptions.Item label="项目比赛时间">
            {eventInfo?.start}
          </Descriptions.Item>
          <Descriptions.Item label="项目裁判">
            {
              refereeData.filter(
                (referee) => referee.id === eventInfo?.refereeId
              )[0]?.name
            }
          </Descriptions.Item>
          <Descriptions.Item label="报名开始时间">
            {eventInfo?.signStart}
          </Descriptions.Item>
          <Descriptions.Item label="报名结束时间">
            {eventInfo?.signEnd}
          </Descriptions.Item>
          <Descriptions.Item label="项目规则">
            {eventInfo?.rule}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default EventInfoDetail;
