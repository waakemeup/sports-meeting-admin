import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}

const DetailProject = ({ id }: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      className="bg-teal-400 hover:bg-teal-500 hover:text-white"
      onClick={() => navigate(`/admin/detail/project/${id}`)}
    >
      详情
    </Button>
  );
};

export default DetailProject;
