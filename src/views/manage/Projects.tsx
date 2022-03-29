import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";
import ProjectModal from "../../components/modal/ProjectModal";
import DeleteProject from "../../components/project/DeleteProject";
import DetailProject from "../../components/project/DetailProject";
import EditProject from "../../components/project/EditProject";

interface ProjectInfo {
  sport_id: string;
  name: string;
  limit: number; //性别限制 0男 1女
  start: string;
  signStart: string;
  signEnd: string;
  refereeId: string;
  unit: string;
  id: number; //TODO:也许要把这个改名 eventId 或者 event_id
  location: string;
}

interface Props {}

const Projects = (props: Props) => {
  const projectList: ProjectInfo[] = [
    {
      id: 0,
      limit: 0,
      sport_id: "2022",
      name: "100m接力赛",
      start: "2022-03-23 00:00:00",
      signStart: "2022-03-15 13:28:01",
      signEnd: "2022-03-25 00:33:00",
      refereeId: "1",
      unit: "秒",
      location: "西区操场",
    },
    {
      id: 1,
      limit: 1,
      sport_id: "2022",
      name: "射击",
      start: "2022-03-23 00:00:00",
      signStart: "2022-03-15 13:28:01",
      signEnd: "2022-03-25 00:33:00",
      refereeId: "1",
      unit: "分",
      location: "西区操场",
    },
    {
      id: 2,
      limit: 0,
      sport_id: "2022",
      name: "三级跳远",
      start: "2022-03-23 00:00:01",
      signStart: "2022-04-10 13:28:01",
      signEnd: "2022-04-22 00:33:00",
      refereeId: "1",
      unit: "米",
      location: "东区操场",
    },
  ];

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
          <ProjectModal />
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            刷新
          </Button>
        </div>

        <Table
          dataSource={projectList}
          rowKey={(record) => record.id}
          scroll={{ x: 600 }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 10,
            total: projectList.length,
          }}
        >
          <Table.Column
            title={"序号"}
            dataIndex={"id"}
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
              return record.id === Number(value);
            }}
          />
          <Table.Column
            title={"届时"}
            dataIndex={"sport_id"}
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
              return record.sport_id
                .toLowerCase()
                .includes(value.toLowerCase());
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
            render={(project: ProjectInfo) => (
              <>{project.limit ? "女" : "男"}</>
            )}
          />
          <Table.Column title={"项目举办日期"} dataIndex={"start"} />
          <Table.Column
            title={"操作"}
            render={(project: ProjectInfo) => (
              <Space>
                <DetailProject id={project.id} />
                <EditProject
                  id={project.id}
                  sport_id={project.sport_id}
                  limit={project.limit}
                  name={project.name}
                  refereeId={project.refereeId}
                  signEnd={project.signEnd}
                  signStart={project.signStart}
                  start={project.start}
                  unit={project.unit}
                  location={project.location}
                />
                <DeleteProject eventId={project.id} />
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
};

export default Projects;
