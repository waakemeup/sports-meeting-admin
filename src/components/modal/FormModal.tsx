import React, { useState } from "react";
import { Modal, Button, message, Form, Input, DatePicker } from "antd";
import axios from "../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { OpeningInfo } from "../../views/manage/Opening";

interface Props {
  setPostData: (data2: OpeningInfo[]) => void;
}

const FormModal = ({ setPostData }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [form] = Form.useForm();

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
    const { name, them, dates } = values;
    let [startDate, endDate] = dates;
    startDate = moment(startDate).format("yyyy-MM-DD HH:mm:ss");
    endDate = moment(endDate).format("yyyy-MM-DD HH:mm:ss");
    console.log({ name, them, startDate, endDate }); // TODO: it's ok

    const postData = qs.stringify({ name, them, startDate, endDate });
    // console.log(postData);

    await axios
      .post(`/createsport`, postData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          message.success("发布成功", 1);
          setTimeout(() => {
            setVisible(false);
            form.resetFields();
          }, 1500);
          // window.location.reload();
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
          .get<OpeningInfo[]>(`/getsportlist`, {
            headers: {
              // @ts-ignore
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => res.data);
        // @ts-ignore
        setPostData(result.data);
      });
  };

  const onFinishFailed = (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      <Button onClick={showModal}>新建</Button>
      <Modal
        title="新建开幕式"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key={"cancel"} onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button form="createopening" key="submit" htmlType="submit">
            提交
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="horizontal"
          id="createopening"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "请输入开幕式名称!" }]}
          >
            <Input placeholder="开幕式名称" />
          </Form.Item>
          <Form.Item
            label="主题"
            name="them"
            rules={[{ required: true, message: "请输入开幕式主题!" }]}
          >
            <Input placeholder="开幕式主题" />
          </Form.Item>
          <Form.Item
            label="选择运动会日期:"
            name="dates"
            rules={[{ required: true, message: "请选择运动会时间段!" }]}
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

export default FormModal;
