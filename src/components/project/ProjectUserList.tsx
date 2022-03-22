import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../api";

interface PlayerInfo {
  id: number; //序号
  card_id: number; //学号
  name: string;
  project: string;
  line?: string; //分道信息
  grade: number; //成绩信息
  rank?: number;
}

interface Props {
  id: string;
}

const ProjectUserList = ({ id }: Props) => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const FetchData = async () => {
  //     const result = await axios
  //       .get(`/event/getparticuser`, {
  //         params: {
  //           id,
  //         },
  //       })
  //       .then((res) => res.data);

  //     setData(result);
  //   };
  //   FetchData();
  // }, [id]);

  return (
    <>
      <Table dataSource={[]}></Table>
    </>
  );
};

export default ProjectUserList;
