import { Button } from "antd";
import React, { useContext } from "react";
import { NavigateFunction } from "react-router-dom";
import { AuthStoreContext } from "../../store/AuthStore";

type Props = {
  navigate: NavigateFunction;
};

const MyContent = ({ navigate }: Props) => {
  const authStore = useContext(AuthStoreContext);

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
            // localStorage.removeItem("token");
            localStorage.clear();
            authStore.isAuth = localStorage.getItem("token") !== null;
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
