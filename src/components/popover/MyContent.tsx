import { Button, message } from "antd";
import React, { useContext } from "react";
import { NavigateFunction } from "react-router-dom";
import { AdminStoreContext } from "../../store/AdminStore";
import { AuthStoreContext } from "../../store/AuthStore";
import * as bcrypt from "bcryptjs";
import { observer } from "mobx-react-lite";

type Props = {
  navigate: NavigateFunction;
};

const MyContent = observer(({ navigate }: Props) => {
  const authStore = useContext(AuthStoreContext);
  const adminStore = useContext(AdminStoreContext);

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
            localStorage.clear();
            authStore.changeAuth();
            adminStore.logout();
            message.success("登出成功");
            navigate("/login");
          }}
        >
          登出
        </Button>
      </div>
    </div>
  );
});

export default MyContent;
