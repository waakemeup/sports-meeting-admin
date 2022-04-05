import React, { useEffect, useState, memo } from "react";
import { Modal, Button, message, Form, Input, DatePicker } from "antd";
import axios from "../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { ProjectTokenInfo } from "../../types.d";

interface Props {
  athletesId: string;
  eventId: string;
  score: string;
  unit: string;
  studentNo: string;
  eventName: string;
  studentName: string;
  record: string;
  setChangeData: (data2: ProjectTokenInfo[]) => void;
}

const RecordScore = ({
  athletesId,
  eventName,
  studentName,
  studentNo,
  record,
  unit,
  eventId,
  score,
  setChangeData,
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  let [form] = Form.useForm();

  const { RangePicker } = DatePicker;

  function onChange(dates: any, dateStrings: any) {
    // console.log("From: ", dates[0], ", to: ", dates[1]);
    // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    const { record, score } = values;

    // console.log(record, score, athletesId, eventId);

    const editPostData = qs.stringify({
      athletesId,
      eventId,
      record,
      score,
    });

    await axios
      .post(`/referee/input`, editPostData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Edit Res:", res);
        if (res.data.code === 200) {
          message.success("录入成功", 1);
          setTimeout(() => {
            setVisible(false);
          }, 1500);
        } else {
          message.error(res.data.message ?? "发生了意外的错误...");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("出了一些小问题...");
      })
      .finally(async () => {
        const result = await axios
          .get<ProjectTokenInfo[]>(`/event/getmatch`, {
            params: {
              eventId,
            },
            headers: {
              // @ts-ignore
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => res.data);
        // @ts-ignore
        setChangeData(result.data);
      });
  };

  const onFinishFailed = (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      <Button
        className="bg-cyan-300 hover:bg-cyan-400 hover:text-white"
        onClick={showModal}
      >
        编辑/录入
      </Button>
      <Modal
        title="编辑或录入运动员成绩"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key={"cancel"} onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button
            form={`recordscore${athletesId}`}
            key="submit"
            htmlType="submit"
          >
            提交
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="horizontal"
          id={`recordscore${athletesId}`}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="参赛人学号">
            <Input placeholder={studentNo} disabled={true} />
          </Form.Item>
          <Form.Item label="参赛人姓名">
            <Input placeholder={studentName} disabled={true} />
          </Form.Item>
          <Form.Item label="参赛项目">
            <Input placeholder={eventName} disabled={true} />
          </Form.Item>
          <Form.Item label="排名" name="record" initialValue={record}>
            <Input placeholder="运动员排名" />
          </Form.Item>
          <Form.Item label="成绩" name="score" initialValue={score}>
            <Input placeholder="运动员比赛成绩" />
          </Form.Item>
          <Form.Item label="单位" initialValue={unit}>
            <Input placeholder={unit} disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(RecordScore);
