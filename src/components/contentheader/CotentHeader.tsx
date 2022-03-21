import { DashboardTwoTone, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  info?: string;
  info2?: string;
  function1?: () => void;
  canFunction1?: boolean;
}

const CotentHeader = ({ info, info2, function1, canFunction1 }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-5 mdm:flex-col mdm:items-start mdm:gap-4">
      <div className="text-3xl font-bold" id="info">
        {info}
      </div>
      <div
        id="right"
        className="flex items-center justify-center gap-2 mdm:w-full mdm:bg-gray-400 mdm:justify-start mdm:p-2 mdm:rounded-md mdm:drop-shadow-xl"
      >
        <DashboardTwoTone twoToneColor="#506362" />
        <div
          onClick={() => navigate("/admin/main")}
          className="transition-colors hover:text-red-400 hover:cursor-pointer"
        >
          首页
        </div>
        <RightOutlined className="text-neutral-300" />
        <div
          onClick={function1}
          className={clsx([
            canFunction1 &&
              "transition-colors hover:text-red-400 hover:cursor-pointer",
          ])}
        >
          {info}
        </div>
        {info2 && (
          <>
            <RightOutlined className="text-neutral-300" />
            <div>{info2}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CotentHeader;
