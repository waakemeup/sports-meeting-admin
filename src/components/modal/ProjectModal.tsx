import React, { useState } from "react";
import { Modal, Button, message, Form, Input, DatePicker, Select } from "antd";
import axios from "../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface Props {}

const ProjectModal = (props: Props) => {
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
    // TODO: 这里假设了裁判长和单位不是必须的
    let { name, sport_id, limit, location, dates, start, refereeId, unit } =
      values;
    let [signStart, signEnd] = dates;

    sport_id = moment(sport_id).year().toString();
    start = moment(start).format("YYYY-MM-DD HH:mm:ss");
    signStart = moment(signStart).format("YYYY-MM-DD HH:mm:ss");
    signEnd = moment(signEnd).format("YYYY-MM-DD HH:mm:ss");

    console.log(sport_id, start, signStart, signEnd);
    await axios
      .post(`/addevent`, {
        sport_id,
        name,
        limit,
        location,
        start,
        signStart,
        signEnd,
        refereeId,
        unit,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("项目发布成功", 1);
          setTimeout(() => {
            setVisible(false);
            form.resetFields();
          }, 1500);
        } else {
          message.error("发生了意外的错误...");
        }
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
      <Button onClick={showModal}>新建</Button>
      <Modal
        title="新建运动会项目"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key={"cancel"} onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button form="createproject" key="submit" htmlType="submit">
            提交
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="horizontal"
          id="createproject"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="届时"
            name="sport_id"
            rules={[{ required: true, message: "请输入选择届时!" }]}
          >
            <DatePicker onChange={onChange} picker="year" />
          </Form.Item>
          <Form.Item
            label="项目"
            name="name"
            rules={[{ required: true, message: "请输入项目名称!" }]}
          >
            <Input placeholder="项目名称" />
          </Form.Item>
          <Form.Item
            name="limit"
            label="性别"
            rules={[{ required: true, message: "请选择你的性别!" }]}
          >
            <Select placeholder="选择你的性别">
              <Option value={0}>男</Option>
              <Option value={1}>女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="地点"
            name="location"
            rules={[{ required: true, message: "请输入项目举办地点!" }]}
          >
            <Input placeholder="项目举办地点" />
          </Form.Item>
          {/* TODO: 此处不加任何限制,也许不对呢 */}
          <Form.Item
            label="项目比赛时间"
            name="start"
            rules={[{ required: true, message: "请输入项目开始时间!" }]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item
            label="选择报名时间段:"
            name="dates"
            rules={[{ required: true, message: "请选择该项目报名时间段!" }]}
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
          <Form.Item
            label="裁判长ID"
            name="refereeId"
            rules={[{ required: true, message: "请输入裁判长ID!" }]}
          >
            <Input placeholder="裁判长ID" />
          </Form.Item>
          <Form.Item
            label="比赛结果单位(如米、秒...)"
            name="unit"
            rules={[{ required: true, message: "请输入比赛结果单位!" }]}
          >
            <Input placeholder="比赛单位" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectModal;
