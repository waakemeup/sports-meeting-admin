import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import axios from "../../api";

const { Option } = Select;

interface Props {
  sport_id: string;
  name: string;
  limit: number;
  start: string;
  signStart: string;
  signEnd: string;
  refereeId: string;
  unit: string;
  id: number; //TODO:也许要把这个改名 eventId 或者 event_id
  location: string;
}

const EditProject = ({
  id,
  limit,
  name,
  refereeId,
  signEnd,
  signStart,
  sport_id,
  start,
  unit,
  location,
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

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
    const { dates, limit, location, name, refereeId, sport_id, start, unit } =
      values;
    let [signStart, signEnd] = dates;
    let startValue = moment(start).format("YYYY-MM-DD HH:mm:ss");
    signStart = moment(signStart).format("YYYY-MM-DD HH:mm:ss");
    signEnd = moment(signEnd).format("YYYY-MM-DD HH:mm:ss");
    // console.log(startValue, signStart, signEnd); OK
    await axios
      .post("/updateevent", {
        event_id: id,
        start: startValue,
        limit,
        location,
        name,
        refereeId,
        sport_id,
        signStart,
        signEnd,
        unit,
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
        title="编辑项目"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key={"cancel"} onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button form={`editproject${id}`} key="submit" htmlType="submit">
            修改
          </Button>,
        ]}
      >
        <Form
          form={form} //TODO: 3个组件共用了一个Form实例，问题所在
          layout="horizontal"
          id={`editproject${id}`}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="届时"
            name="sport_id"
            rules={[{ required: true, message: "请输入项目届时!" }]}
            initialValue={sport_id}
          >
            <Input placeholder="项目届时" />
          </Form.Item>
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: "请输入项目名称!" }]}
            initialValue={name}
          >
            <Input placeholder="项目名称" />
          </Form.Item>
          <Form.Item
            label="参赛性别限制"
            name="limit"
            rules={[{ required: true, message: "请选择项目性别限制!" }]}
            initialValue={limit}
          >
            <Select placeholder="选择项目限制性别">
              <Option value={0}>男</Option>
              <Option value={1}>女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="项目进行地点"
            name="location"
            rules={[{ required: true, message: "请填写项目进行地点!" }]}
            initialValue={location}
          >
            <Input placeholder="项目进行地点" />
          </Form.Item>
          <Form.Item
            label="选择项目报名时间段:"
            name="dates"
            rules={[{ required: true, message: "请选择项目报名时间段!" }]}
            initialValue={[
              moment(signStart, "YYYY-MM-DD HH:mm:ss"),
              moment(signEnd, "YYYY-MM-DD HH:mm:ss"),
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
          <Form.Item
            label="项目比赛时间:"
            name="start"
            rules={[{ required: true, message: "请选择项目比赛时间!" }]}
            initialValue={moment(start, "YYYY-MM-DD HH:mm:ss")}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item
            label="裁判长ID"
            name="refereeId"
            rules={[{ required: true, message: "请填写项目裁判长ID!" }]}
            initialValue={refereeId}
          >
            <Input placeholder="裁判长ID" />
          </Form.Item>
          <Form.Item
            label="成绩记录单位"
            name="unit"
            rules={[{ required: true, message: "请填写成绩记录单位!" }]}
            initialValue={unit}
          >
            <Input placeholder="成绩记录单位" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProject;
