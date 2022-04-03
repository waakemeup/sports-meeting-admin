import React, { useEffect, useState } from "react";
import { Modal, Button, message, Form, Input, DatePicker, Select } from "antd";
import axios from "../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { OpeningInfo } from "../../views/manage/Opening";
import { ProjectInfo, RefereeInfo } from "../../types";

const { Option } = Select;

interface Props {
  setPostData: (data2: ProjectInfo[]) => void;
}

const ProjectModal = ({ setPostData }: Props) => {
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
    let {
      name,
      sport_id,
      limit,
      location,
      dates,
      start,
      refereeId,
      unit,
      rule,
    } = values;
    let [signStart, signEnd] = dates;

    start = moment(start).format("YYYY-MM-DD HH:mm:ss");
    signStart = moment(signStart).format("YYYY-MM-DD HH:mm:ss");
    signEnd = moment(signEnd).format("YYYY-MM-DD HH:mm:ss");

    // console.log(sport_id, start, signStart, signEnd);

    const postData = qs.stringify({
      sport_id,
      name,
      limit,
      location,
      start,
      signStart,
      signEnd,
      refereeId,
      unit,
      rule,
    });

    await axios
      .post(`/addEvent`, postData, {
        headers: {
          // @ts-ignore
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          console.log(res);
          message.success("项目发布成功", 1);
          setTimeout(() => {
            setVisible(false);
            form.resetFields();
          }, 1500);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("出了一些小问题...");
      })
      .finally(async () => {
        const result = await axios
          .get<ProjectInfo[]>(`/getevents`, {
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
            rules={[{ required: true, message: "请选择是哪届运动会!" }]}
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
            label="项目"
            name="name"
            rules={[{ required: true, message: "请输入项目名称!" }]}
          >
            <Input placeholder="项目名称" />
          </Form.Item>
          <Form.Item
            name="limit"
            label="性别"
            rules={[{ required: true, message: "请选择项目性别限制!" }]}
          >
            <Select placeholder="选择项目性别限制">
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
            <Select placeholder="选择裁判长">
              {refereeData.map((singleData) => (
                <Option key={singleData.id} value={singleData.id}>
                  {singleData.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="比赛结果单位(如米、秒...)"
            name="unit"
            rules={[{ required: true, message: "请输入比赛结果单位!" }]}
          >
            <Input placeholder="比赛单位" />
          </Form.Item>
          <Form.Item
            label="比赛规则简介"
            name="rule"
            rules={[{ required: true, message: "请输入比赛规则简介!" }]}
          >
            <Input placeholder="比赛规则简单介绍..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectModal;
