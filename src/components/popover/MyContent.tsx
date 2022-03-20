import { Button } from "antd";
import React from "react";
import { NavigateFunction } from "react-router-dom";

type Props = {
  navigate: NavigateFunction;
};

const MyContent = ({ navigate }: Props) => {
  return (
    <div className="">
      <div>Hello</div>
      <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
        <Button
          type="primary"
          className="p-1 text-center rounded-md bg-cyan-500"
          onClick={() => {
            navigate("/admin/me/changepassword");
          }}
        >
          修改密码
        </Button>
        <Button
          className="p-1 text-center bg-yellow-400 rounded-md"
          onClick={() => {
            navigate("/login");
          }}
        >
          登出
        </Button>
      </div>
    </div>
  );
};

export default MyContent;
