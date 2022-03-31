import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const UnAuth = (props: Props) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen font-mono text-2xl font-extrabold bg-neutral-300">
      这不能看哦🥹 | 请先
      <Link
        to={`/login`}
        className="underline decoration-4 underline-offset-2 underline-indigo-600"
      >
        {" "}
        登录
      </Link>{" "}
      | 或者
      <Link
        to={"/register"}
        className="underline decoration-4 underline-offset-2 underline-indigo-600"
      >
        注册
      </Link>
    </div>
  );
};

export default UnAuth;
