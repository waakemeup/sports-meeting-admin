import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import axios from "../../api";
import { OpeningInfo } from "../../views/manage/Opening";
import qs from "qs";

interface Props {
  id: string;
  setDeleteData: (data2: OpeningInfo[]) => void;
}

const DeleteOpening = ({ id, setDeleteData }: Props) => {
  const confirm = async (e: any) => {
    // console.log(e);

    const deletePostData = qs.stringify({ id });

    await axios
      .post(`/deletesport`, deletePostData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          message.success("删除成功");
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
          .get<OpeningInfo[]>(`/getsportlist`, {
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
      title="确定要改变删除这次运动会吗?"
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

export default DeleteOpening;
