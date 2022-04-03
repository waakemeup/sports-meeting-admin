import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import axios from "../../api";
import { ProjectInfo } from "../../types.d";
import qs from "qs";

interface Props {
  eventId: string;
  setDeleteData: (data2: ProjectInfo[]) => void;
}

const DeleteProject = ({ eventId, setDeleteData }: Props) => {
  const confirm = async (e: any) => {
    const deletePostData = qs.stringify({ eventId });
    await axios
      .post(`/delevent`, deletePostData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("删除成功");
        } else {
          message.error("出现了未知错误...");
        }
        console.log("删除的ID:", eventId);
      })
      .catch((err) => {
        console.log(err);
        message.error("出现了错误呢...");
      })
      .finally(async () => {
        const result = await axios
          .get<ProjectInfo[]>(`/getevents`, {
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
    message.error("取消了呢");
  }

  return (
    <Popconfirm
      title="确定要改变删除这个项目吗?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      okType="ghost"
    >
      <Button danger type="primary">
        删除
      </Button>
    </Popconfirm>
  );
};

export default DeleteProject;
