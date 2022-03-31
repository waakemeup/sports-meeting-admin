import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const Page404 = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          className="bg-sky-500"
          onClick={() => {
            navigate("/admin/main");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Page404;
