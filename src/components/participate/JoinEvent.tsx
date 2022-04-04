import { Button, message, Popconfirm } from "antd";
import React from "react";
import { ProjectInfo } from "../../types";
import qs from "qs";
import axios from "../../api";

interface Props {
  id: string;
  sport_id: string;
  setPostData: (data2: ProjectInfo[]) => void;
}

const JoinEvent = ({ id, sport_id, setPostData }: Props) => {
  const confirm = async (e: any) => {
    // console.log(e);

    const joinPostData = qs.stringify({ eventID: id });

    await axios
      .post(`/user/partic`, joinPostData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          message.success("参赛成功");
        } else {
          message.error("出现了未知错误...");
        }
        // console.log("删除的ID:", id);
      })
      .catch((err) => {
        console.log(err);
        message.error("出现了错误呢...");
      })
      .finally(async () => {
        const result = await axios
          .get<ProjectInfo[]>(`/user/getpartic`, {
            params: {
              sportMeeting: sport_id,
            },
            headers: {
              // @ts-ignore
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => res.data);
        // @ts-ignore
        setPostData(result.data);
      });
  };

  function cancel(e: any) {
    // console.log(e);
    message.error("取消了呢");
  }

  return (
    <Popconfirm
      title="确定要参加这个项目吗?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      okType="ghost"
    >
      <Button
        className="text-black bg-teal-400 hover:bg-teal-500 hover:text-white rounded-2xl"
        type="primary"
      >
        报名参赛
      </Button>
    </Popconfirm>
  );
};

export default JoinEvent;
