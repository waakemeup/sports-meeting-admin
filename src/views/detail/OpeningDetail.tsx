import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Table } from "antd";
import { OpeningInfo } from "../manage/Opening";
import axios from "../../api";
import { observer } from "mobx-react-lite";

// TODO: 还差项目信息

interface Props {}

const tabListNoTitle = [
  {
    key: "开幕式详细信息",
    tab: "开幕式详细信息",
  },
];

const OpeningDetail = observer((props: Props) => {
  const [data, setData] = useState<OpeningInfo[]>([]);
  const [info, setInfo] = useState<OpeningInfo>();
  // const [name, setName] = useState("default");
  const navigate = useNavigate();
  const { id } = useParams();

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
      // console.log(data);
    };
    FetchData();
  }, []);

  let name = "未能查找到";
  let startdate = "未能查找到";
  let enddate = "未能查找到";
  let status: number = 0;
  let theme = "未能查找到";

  for (let i = 0; i < data?.length; i++) {
    if (data[i].id === id) {
      name = data[i].name;
      startdate = data[i].startdate;
      enddate = data[i].enddate;
      status = data[i].status;
      theme = data[i].theme;
    }
  }

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
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="状态">
            {status ? "开启" : "结束"}
          </Descriptions.Item>
          <Descriptions.Item label="举办时间">{startdate}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{startdate}</Descriptions.Item>
          <Descriptions.Item label="结束时间">{enddate}</Descriptions.Item>
          <Descriptions.Item label="主题">{theme}</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
});

export default OpeningDetail;
