import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import axios from "../../api";
import { ProjectInfo, ProjectTokenInfo } from "../../types.d";
import qs from "qs";

interface Props {
  id: string;
  setDeleteData: (data2: ProjectTokenInfo[]) => void;
}

const ExitProject = ({ id, setDeleteData }: Props) => {
  const confirm = async (e: any) => {
    // console.log(e);

    const deletePostData = qs.stringify({ eventId: id });

    await axios
      .post(`/user/exit`, deletePostData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          message.success("退赛成功");
        } else {
          message.warn(res.data.data ?? "出现了未知错误...");
        }
        // console.log("删除的ID:", id);
      })
      .catch((err) => {
        console.log(err);
        message.error("出现了错误呢...");
      })
      .finally(async () => {
        const result = await axios
          .get<ProjectInfo[]>(`/user/getparticed`, {
            headers: {
              // @ts-ignore
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => res.data);
        // @ts-ignore
        setDeleteData(result.data);
      });
  };

  function cancel(e: any) {
    // console.log(e);
    message.error("取消了呢");
  }

  return (
    <Popconfirm
      title="确定要退出这个项目吗?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      okType="ghost"
    >
      <Button className="bg-rose-400 hover:bg-rose-500 hover:text-white">
        退赛
      </Button>
    </Popconfirm>
  );
};

export default ExitProject;
