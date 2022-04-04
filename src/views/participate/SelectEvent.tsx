import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { useParams } from "react-router-dom";
import { ProjectInfo } from "../../types.d";
import axios from "../../api";
import { SearchOutlined } from "@ant-design/icons";
import JoinEvent from "../../components/participate/JoinEvent";

interface Props {}

const SelectEvent = (props: Props) => {
  const { id } = useParams();

  const [projectData, setProjectData] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectInfo[]>(`/user/getpartic`, {
          params: {
            sportMeeting: id,
          },
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);
      // @ts-ignore
      setProjectData(result.data);
    };
    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>参加比赛 - 选择参赛项目</title>
        <meta name="description" content="参加比赛选择参赛项目" />
      </Helmet>
      <ContentHeader info={"参加比赛"} info2={"项目列表"} replace={true} />
      <Card
        title="可参加项目"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
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
              <JoinEvent
                id={eventInfo.id}
                sport_id={eventInfo.sportId}
                setPostData={(data2) => setProjectData(data2)}
              />
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default SelectEvent;
