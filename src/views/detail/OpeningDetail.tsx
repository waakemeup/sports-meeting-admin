import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Table, Input } from "antd";
import { OpeningInfo } from "../manage/Opening";
import { ProjectInfo } from "../../types.d";
import axios from "../../api";
import { observer } from "mobx-react-lite";
import qs from "qs";
import DetailProject from "../../components/project/DetailProject";
import { SearchOutlined } from "@ant-design/icons";

// TODO: 还差项目信息

interface Props {}

const tabListNoTitle = [
  {
    key: "开幕式详细信息",
    tab: "开幕式详细信息",
  },
];

const OpeningDetail = observer((props: Props) => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("项目信息");

  const onTab1Change = (key: any) => {
    setActiveTabKey1(key);
  };

  const [data, setData] = useState<OpeningInfo[]>([]);
  const [projectData, setProjectData] = useState<ProjectInfo[]>([]);
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);
  const [info, setInfo] = useState<OpeningInfo>();
  // const [name, setName] = useState("default");
  const navigate = useNavigate();
  const { id } = useParams();

  // const queryId = qs.stringify({ sport_id: id });

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
        .get<ProjectInfo[]>(`/getcurevents`, {
          params: {
            sport_id: id,
          },
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result3 = await axios
        .get<ProjectInfo[]>(`/getevents`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      // @ts-ignore
      setOpeningData(result3.data);

      // @ts-ignore
      setProjectData(result2.data);

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

  const tabList = [
    {
      key: "项目信息",
      tab: "项目信息",
    },
    // {
    //   key: "成绩信息",
    //   tab: "成绩信息",
    // },
  ];

  const contentList = {
    项目信息: (
      <>
        <Table
          dataSource={projectData}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: projectData.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = projectData.filter(
                      (item) => item.id === value
                    );

                    return projectData.indexOf(selected[0]) + 1;
                  })()}
                </>
              );
            }}
          />
          <Table.Column
            title={"届时"}
            dataIndex={"sportId"}
            render={(value) => (
              <>
                {data.filter((single) => single.id === value)[0]?.name ??
                  "未找到运动会"}
              </>
            )}
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
            title={"项目性别限制"}
            dataIndex={"limit"}
            render={(value: string) => <>{parseInt(value) ? "女" : "男"}</>}
          />
          <Table.Column title={"项目举办地点"} dataIndex={"location"} />
          <Table.Column title={"项目举办日期"} dataIndex={"start"} />
          <Table.Column title={"报名开始日期"} dataIndex={"signStart"} />
          <Table.Column title={"报名结束日期"} dataIndex={"signEnd"} />
          <Table.Column
            title={"操作"}
            render={(eventInfo: ProjectInfo) => (
              <DetailProject id={eventInfo.id} />
            )}
          />
        </Table>
      </>
    ),
    // 成绩信息: <>成绩信息</>,
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
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {
          // @ts-ignore
          contentList[activeTabKey1]
        }
      </Card>
    </>
  );
});

export default OpeningDetail;
