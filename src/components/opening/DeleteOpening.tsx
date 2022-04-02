import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import axios from "../../api";

interface Props {
  id: string;
}

const DeleteOpening = ({ id }: Props) => {
  const [exist, setExist] = useState<boolean>(true);

  const confirm = async (e: any) => {
    console.log(e);
    await axios
      .post(`/deletesport`, {
        id,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("删除成功");
        } else {
          message.error("出现了未知错误...");
        }
        console.log("删除的ID:", id);
      })
      .catch((err) => {
        console.log(err);
        message.error("出现了错误呢...");
      });
  };

  function cancel(e: any) {
    console.log(e);
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
