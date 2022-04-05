import React, { useEffect, useState } from "react";
import { Button, Card, Input, Table } from "antd";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../../components/contentheader/CotentHeader";
import axios from "../../../../api";
import { OpeningInfo, ProjectInfo } from "../../../../types";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Props {}

const RefereeScoreList = (props: Props) => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<ProjectInfo[]>([]);
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectInfo[]>(`/referee/getevents`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result2 = await axios
        .get<OpeningInfo[]>(`/getsportlist`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      // @ts-ignore
      setEventData(result.data);

      // @ts-ignore
      setOpeningData(result2.data);
    };
    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>成绩管理 - 成绩列表</title>
        <meta name="description" content="成绩管理成绩列表" />
      </Helmet>
      <ContentHeader info={"成绩管理"} info2={"成绩列表"} replace={true} />
      <Card
        title="我负责的比赛项目列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <Table
          dataSource={eventData}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            total: eventData.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = eventData.filter(
                      (item) => item.id === value
                    );

                    return eventData.indexOf(selected[0]) + 1;
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
                {openingData.filter((single) => single.id === value)[0]?.name ??
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
          <Table.Column title={"项目举办日期"} dataIndex={"start"} />
          <Table.Column
            title="操作"
            dataIndex="id"
            render={(value) => (
              <Button
                className="bg-teal-400 hover:bg-teal-500 hover:text-white"
                onClick={() => navigate(`/admin/manage/referee/watch/${value}`)}
              >
                详情
              </Button>
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default RefereeScoreList;
