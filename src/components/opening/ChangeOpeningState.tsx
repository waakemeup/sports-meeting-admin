import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import axios from "../../api";
import clsx from "clsx";
import qs from "qs";

interface Props {
  id: string;
  status: number;
}

const ChangeOpeningState = ({ id, status }: Props) => {
  const [status1, setStatus1] = useState<number>(status);

  const confirm = async (e: any) => {
    // console.log(e);
    // setOpeningState(!openingState);
    status = status ? 0 : 1;
    const changeStatusData = qs.stringify({ id, status });

    await axios.post("meetupdate", changeStatusData, {
      headers: {
        // @ts-ignore
        token: localStorage.getItem("token"),
      },
    });
    message.success("修改成功");
    setStatus1(status1 ? 0 : 1);
  };

  function cancel(e: any) {
    console.log(e);
    message.error("取消了呢");
  }

  return (
    <Popconfirm
      title="确定要改变状态吗?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      okType="ghost"
    >
      <Button
        className={clsx(
          !status1 && ["bg-teal-400", "hover:bg-teal-600"],
          status1 && ["bg-red-400", "hover:bg-red-600"],
          "rounded-2xl",
          "font-bold"
        )}
      >
        {status1 ? "关闭" : "开启"}
      </Button>
    </Popconfirm>
  );
};

export default ChangeOpeningState;
