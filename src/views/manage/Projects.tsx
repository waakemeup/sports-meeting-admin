import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import ProjectModal from "../../components/modal/ProjectModal";
import DeleteProject from "../../components/project/DeleteProject";
import DetailProject from "../../components/project/DetailProject";
import EditProject from "../../components/project/EditProject";
import axios from "../../api";
import { OpeningInfo } from "../../types";

interface ProjectInfo {
  sportId: string;
  name: string;
  limit: number;
  start: string;
  signStart: string;
  signEnd: string;
  refereeId: string;
  unit: string;
  id: string;
  location: string;
  rule: string;
}

interface Props {}

const Projects = (props: Props) => {
  const [data, setData] = useState<ProjectInfo[]>([]);
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectInfo[]>(`/getevents`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result2 = await axios
        .get<ProjectInfo[]>(`/getsportlist`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);
      // @ts-ignore
      setData(result.data);

      // @ts-ignore
      setOpeningData(result2.data);
      // console.log(data);
    };
    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>项目管理</title>
        <meta name="description" content="运动会项目管理" />
      </Helmet>
      <ContentHeader info={"项目管理"} />
      <Card
        title="项目列表"
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <div id="buttons" className="mb-4">
          <ProjectModal setPostData={(data2) => setData(data2)} />
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
            render={(value): JSX.Element => {
              return (
                <>
                  {(() => {
                    const selected = data.filter((item) => item.id === value);

                    return data.indexOf(selected[0]) + 1;
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
            title={"操作"}
            render={(project: ProjectInfo) => (
              <Space>
                <EditProject
                  id={project.id}
                  sport_id={project.sportId}
                  limit={project.limit}
                  name={project.name}
                  refereeId={project.refereeId}
                  signEnd={project.signEnd}
                  signStart={project.signStart}
                  start={project.start}
                  unit={project.unit}
                  location={project.location}
                  rule={project.rule}
                  setChangeData={(data2) => setData(data2)}
                />
                <DeleteProject
                  eventId={project.id}
                  setDeleteData={(data2) => setData(data2)}
                />
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default Projects;
