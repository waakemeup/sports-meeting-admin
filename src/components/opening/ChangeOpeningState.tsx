import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import clsx from "clsx";

interface Props {
  id: number;
}

const ChangeOpeningState = (props: Props) => {
  const [openingState, setOpeningState] = useState<boolean>(true);

  function confirm(e: any) {
    // console.log(e);
    setOpeningState(!openingState);
    message.success("修改成功");
  }

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
    >
      <Button
        className={clsx(
          openingState && ["bg-teal-400", "hover:bg-teal-600"],
          !openingState && ["bg-red-400", "hover:bg-red-600"],
          "rounded-2xl",
          "font-bold"
        )}
      >
        {openingState ? "开启" : "关闭"}
      </Button>
    </Popconfirm>
  );
};

export default ChangeOpeningState;
