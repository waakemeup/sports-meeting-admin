import React, { useContext, useEffect, useState, memo } from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Helmet } from "react-helmet";
import { Button, Card, Descriptions, Input, Table } from "antd";
import * as bcrypt from "bcryptjs";
import { observer } from "mobx-react-lite";
import { AdminStoreContext } from "../../store/AdminStore";
import {
  OpeningInfo,
  ProjectInfo,
  StudentInfo,
  ProjectTokenInfo,
} from "../../types";
import axios from "../../api";
import getDepartment from "../../utils/getDepartment";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface UserProjectInfo {
  id: number;
  sport_id: string;
  name: string;
  game_name: string;
  take_time: string; //参赛时间
  grade?: string; //成绩
}

// "id": "a02aa42640904b76975a238aed3e0d10",
// "name": "别叫醒我",
// "gender": true,
// "dep": 14,
// "no": "201906120421",
// "userId": "55a4d367e4574dde8e576f749ef49a4b"

interface Props {}

const tabListNoTitle = [
  {
    key: "我的信息",
    tab: "我的信息",
  },
];

const _tabListNoTitle = [
  {
    key: "参赛信息",
    tab: "参赛信息",
  },
];

const JoinProject = memo(() => {
  const [myEventData, setMyEventData] = useState<ProjectTokenInfo[]>([]);
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);
  const [eventData, setEventData] = useState<ProjectInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<ProjectTokenInfo[]>(`/user/getparticed`, {
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

      const result3 = await axios
        .get<ProjectInfo[]>(`/getevents`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      // @ts-ignore
      setEventData(result3.data);
      // @ts-ignore
      setOpeningData(result2.data);
      // @ts-ignore
      setMyEventData(result.data);
    };
    FetchData();
  }, []);

  // console.log("myEventData:", myEventData);

  return (
    <Card
      className="my-8 border-t-4 rounded-sm border-t-blue-300"
      tabList={_tabListNoTitle}
    >
      <Table
        dataSource={myEventData}
        rowKey={(record) => record.eventId}
        scroll={{ x: 600 }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 5,
          total: myEventData.length,
        }}
      >
        <Table.Column
          title={"序号"}
          dataIndex={"eventId"}
          render={(value): JSX.Element => {
            return (
              <>
                {(() => {
                  const selected = myEventData.filter(
                    (item) => item.eventId === value
                  );
                  return myEventData.indexOf(selected[0]) + 1;
                })()}
              </>
            );
          }}
        />
        <Table.Column
          title={"届时"}
          dataIndex={"eventId"}
          render={(value) => (
            <>
              {
                openingData.filter(
                  (opening) =>
                    opening.id ===
                    eventData.filter((single) => single.id === value)[0]
                      ?.sportId
                )[0]?.name
              }
            </>
          )}
        />
        <Table.Column
          title={"参赛项目"}
          dataIndex={"eventName"}
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
            return record.eventName.toLowerCase().includes(value.toLowerCase());
          }}
        />
        <Table.Column
          title={"参赛时间"}
          dataIndex={"eventId"}
          render={(value) => (
            <>
              {eventData.filter((single) => single.id === value)[0]?.start ??
                "未找到举办日期"}
            </>
          )}
        />
        <Table.Column
          title={"成绩"}
          render={(data: ProjectTokenInfo) => (
            <>{data.score === null ? "未录入" : data.score + " " + data.unit}</>
          )}
        />
        <Table.Column
          title={"排名"}
          dataIndex={"rank"}
          render={(value) => <>{value ?? "暂未排名"}</>}
        />
        <Table.Column
          title={"操作"}
          render={(projectToken: ProjectTokenInfo) => (
            <Button
              onClick={() =>
                navigate(`/admin/detail/eventinfo/${projectToken.eventId}`, {
                  state: {
                    studentNo: projectToken.studentNo,
                    studentName: projectToken.studentName,
                    score: projectToken.score,
                    rank: projectToken.rank,
                    unit: projectToken.unit,
                    eventInfo: eventData.filter(
                      (event) => event.id === projectToken.eventId
                    )[0],
                  },
                })
              }
              className="font-bold bg-indigo-300 shadow-lg rounded-2xl shadow-indigo-300/50 hover:bg-indigo-300 hover:text-white"
            >
              详情
            </Button>
          )}
        />
      </Table>
    </Card>
  );
});

const MeInfo = observer((props: Props) => {
  const adminStore = useContext(AdminStoreContext);

  const [studentInfo, setStudentInfo] = useState<StudentInfo>();

  const arr: string[] = ["0", "1", "2", "3", "4"];

  let adminRole: undefined | string = undefined;

  for (let item of arr) {
    if (bcrypt.compareSync(item, adminStore.admin.role as string)) {
      adminRole = item;
      break;
    }
  }

  if (adminRole === "3") {
    useEffect(() => {
      const FetchData = async () => {
        const result = await axios
          .get<StudentInfo[]>(`/user/getdetail`, {
            headers: {
              // @ts-ignore
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => res.data);
        // @ts-ignore
        setStudentInfo(result.data);
      };
      FetchData();
    }, []);
  }

  return (
    <>
      <Helmet>
        <title>我的信息</title>
        <meta name="description" content="我的信息" />
      </Helmet>
      <ContentHeader info={"我的信息"} />
      <Card
        className="my-8 border-t-4 rounded-sm border-t-blue-300"
        tabList={tabListNoTitle}
      >
        {adminRole !== "3" ? (
          <Descriptions bordered>
            <Descriptions.Item label="标识">
              {adminRole === "0"
                ? "管理员"
                : adminRole === "1"
                ? "裁判"
                : adminRole === "2"
                ? "学院账号"
                : adminRole === "3"
                ? "学生"
                : "未知账号"}
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {adminStore.admin.username}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions bordered>
            <Descriptions.Item label="标识">学生</Descriptions.Item>
            <Descriptions.Item label="名称">
              {studentInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {studentInfo?.gender ? "女" : "男"}
            </Descriptions.Item>
            <Descriptions.Item label="学号">
              {studentInfo?.no}
            </Descriptions.Item>
            <Descriptions.Item label="院系">
              {getDepartment(studentInfo?.dep as number)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      {adminRole === "3" && <JoinProject />}
    </>
  );
});

export default MeInfo;
