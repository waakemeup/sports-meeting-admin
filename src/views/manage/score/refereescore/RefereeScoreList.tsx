import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../../../components/contentheader/CotentHeader";
import axios from "../../../../api";
import { OpeningInfo, ProjectInfo } from "../../../../types";
import { SearchOutlined } from "@ant-design/icons";

interface Props {}

const RefereeScoreList = (props: Props) => {
  return (
    <>
      <Helmet>
        <title>成绩管理 - 成绩列表</title>
        <meta name="description" content="成绩管理成绩列表" />
      </Helmet>
      <ContentHeader info={"成绩管理"} info2={"成绩列表"} replace={true} />
    </>
  );
};

export default RefereeScoreList;
