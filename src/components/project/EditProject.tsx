import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import axios from "../../api";
import { OpeningInfo, RefereeInfo } from "../../types";
import qs from "qs";

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
  id: string;
  location: string;
  rule: string;
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
  rule,
}: Props) => {
  const [openingData, setOpeningData] = useState<OpeningInfo[]>([]);
  const [refereeData, setRefereeData] = useState<RefereeInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios
        .get<OpeningInfo[]>(`/getsportlist`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);

      const result2 = await axios
        .get<RefereeInfo[]>(`/referee/referees`, {
          headers: {
            // @ts-ignore
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res.data);
      // @ts-ignore
      setOpeningData(result.data);
      // @ts-ignore
      setRefereeData(result2.data);
      // console.log(data);
    };
    FetchData();
  }, []);

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
    const {
      dates,
      limit,
      location,
      name,
      refereeId,
      sportId,
      start,
      unit,
      rule,
    } = values;
    let [signStart, signEnd] = dates;
    let startValue = moment(start).format("YYYY-MM-DD HH:mm:ss");
    signStart = moment(signStart).format("YYYY-MM-DD HH:mm:ss");
    signEnd = moment(signEnd).format("YYYY-MM-DD HH:mm:ss");
    // console.log(startValue, signStart, signEnd); OK

    console.log({
      event_id: id,
      start: startValue,
      limit,
      location,
      name,
      refereeId,
      sport_id: sportId,
      signStart,
      signEnd,
      unit,
      rule,
    });

    const editPostData = qs.stringify({
      event_id: id,
      start: startValue,
      limit,
      location,
      name,
      refereeId,
      sport_id: sportId,
      signStart,
      signEnd,
      unit,
      rule,
    });

    await axios
      .post("/updateevent", editPostData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          message.success("修改成功", 1);
          setTimeout(() => {
            setVisible(false);
          }, 1500);
        } else {
          message.error(res.data.message);
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
            name="sportId"
            rules={[{ required: true, message: "请输入项目届时!" }]}
            initialValue={sport_id}
          >
            <Select placeholder="选择运动会届时">
              {openingData.map((singleData) => (
                <Option key={singleData.id} value={singleData.id}>
                  {singleData.name}
                </Option>
              ))}
            </Select>
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
            initialValue={parseInt(String(limit))}
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
            rules={[{ required: true, message: "请输入裁判长ID!" }]}
            initialValue={refereeId}
          >
            <Select placeholder="选择裁判长">
              {refereeData.map((singleData) => (
                <Option key={singleData.id} value={singleData.id}>
                  {singleData.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="成绩记录单位"
            name="unit"
            rules={[{ required: true, message: "请填写成绩记录单位!" }]}
            initialValue={unit}
          >
            <Input placeholder="成绩记录单位" />
          </Form.Item>
          <Form.Item
            label="比赛规则简介"
            name="rule"
            rules={[{ required: true, message: "请输入比赛规则简介!" }]}
            initialValue={rule}
          >
            <Input placeholder="比赛规则简单介绍..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProject;
