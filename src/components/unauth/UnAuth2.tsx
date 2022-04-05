import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const UnAuth2 = (props: Props) => {
  return (
    <div className="!w-screen !h-screen flex items-center justify-center font-mono text-2xl font-extrabold bg-neutral-300">
      这不能看哦🥹 | 您的权限不够捏
    </div>
  );
};

export default UnAuth2;
