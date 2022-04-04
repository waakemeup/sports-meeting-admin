import React, { useContext, useEffect, useState } from "react";
import ContentHeader from "../../components/contentheader/CotentHeader";
import { Helmet } from "react-helmet";
import { Card, Descriptions, Table } from "antd";
import * as bcrypt from "bcryptjs";
import { observer } from "mobx-react-lite";
import { AdminStoreContext } from "../../store/AdminStore";
import { StudentInfo } from "../../types";
import axios from "../../api";
import getDepartment from "../../utils/getDepartment";

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

// TODO:只有学生有这个
const JoinProject = () => {
  const takePartList: UserProjectInfo[] = [
    {
      id: 1,
      sport_id: "2020",
      name: "测试",
      game_name: "射击",
      take_time: "2020-01-18 15:24:47",
      grade: undefined,
    },
    {
      id: 2,
      sport_id: "2020",
      name: "测试",
      game_name: "三级跳远",
      take_time: "2020-01-18 15:24:47",
      grade: "100",
    },
  ];

  return (
    <Card
      className="my-8 border-t-4 rounded-sm border-t-blue-300"
      tabList={_tabListNoTitle}
    >
      <Table
        dataSource={takePartList}
        rowKey={(record) => record.id}
        scroll={{ x: 600 }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 5,
          total: 1,
        }}
      >
        <Table.Column title={"序号"} dataIndex={"id"} />
        <Table.Column title={"参加届时"} dataIndex={"sport_id"} />
        <Table.Column title={"参赛人"} dataIndex={"name"} />
        <Table.Column title={"参赛项目"} dataIndex={"game_name"} />
        <Table.Column title={"参赛时间"} dataIndex={"take_time"} />
        <Table.Column
          title={"成绩"}
          dataIndex={"grade"}
          render={(value) => (
            <>{typeof value === "undefined" ? "成绩未录入" : value}</>
          )}
        />
      </Table>
    </Card>
  );
};

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
