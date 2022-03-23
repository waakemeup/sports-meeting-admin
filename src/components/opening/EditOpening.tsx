import React, { useEffect, useState, memo } from "react";
import { Modal, Button, message, Form, Input, DatePicker } from "antd";
import axios from "../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  theme: string;
  startDate: string;
  endDate: string;
  name: string;
}

const EditOpening = ({ id, name, endDate, startDate, theme }: Props) => {
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
    console.log("Success:", values);
    const { name, theme, dates } = values;
    let [startDate, endDate] = dates;
    startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
    console.log({ name, theme, startDate, endDate, id }); // TODO: it's ok
    await axios
      .post(`/updatesport`, {
        id,
        name,
        theme,
        startDate,
        endDate,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("修改成功", 1);
          setTimeout(() => {
            setVisible(false);
          }, 1500);
        } else {
          message.error("发生了意外的错误...");
        }
        console.log("修改的ID:", id);
      })
      .catch((err) => {
        console.log(err);
        message.error("出了一些小问题...");
      });
  };

  const onFinishFailed = (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      <Button className="bg-cyan-300" onClick={showModal}>
        编辑
      </Button>
      <Modal
        title="编辑开幕式"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key={"cancel"} onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button form={`editopening${id}`} key="submit" htmlType="submit">
            提交
          </Button>,
        ]}
      >
        <Form
          form={form} //TODO: 3个组件共用了一个Form实例，问题所在
          layout="horizontal"
          id={`editopening${id}`}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "请输入开幕式名称!" }]}
            initialValue={name}
          >
            <Input placeholder="开幕式名称" />
          </Form.Item>
          <Form.Item
            label="主题"
            name="theme"
            rules={[{ required: true, message: "请输入开幕式主题!" }]}
            initialValue={theme}
          >
            <Input placeholder="开幕式主题" />
          </Form.Item>
          <Form.Item
            label="选择运动会日期:"
            name="dates"
            rules={[{ required: true, message: "请选择运动会时间段!" }]}
            initialValue={[
              moment(startDate, "YYYY-MM-DD HH:mm:ss"),
              moment(endDate, "YYYY-MM-DD HH:mm:ss"),
            ]}
          >
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(EditOpening);
