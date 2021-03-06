import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import axios from "../../api";
import { OpeningInfo, RefereeInfo, ProjectInfo } from "../../types";
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
  setChangeData: (data2: ProjectInfo[]) => void;
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
  setChangeData,
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
          message.success("????????????", 1);
          setTimeout(() => {
            setVisible(false);
          }, 1500);
        } else {
          message.error(res.data.message);
        }
        console.log("?????????ID:", id);
      })
      .catch((err) => {
        console.log(err);
        message.error("?????????????????????...");
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
        setChangeData(result.data);
      });
  };

  const onFinishFailed = (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      <Button className="bg-cyan-300" onClick={showModal}>
        ??????
      </Button>
      <Modal
        title="????????????"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key={"cancel"} onClick={() => setVisible(false)}>
            ??????
          </Button>,
          <Button form={`editproject${id}`} key="submit" htmlType="submit">
            ??????
          </Button>,
        ]}
      >
        <Form
          form={form} //TODO: 3????????????????????????Form?????????????????????
          layout="horizontal"
          id={`editproject${id}`}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="??????"
            name="sportId"
            rules={[{ required: true, message: "?????????????????????!" }]}
            initialValue={sport_id}
          >
            <Select placeholder="?????????????????????">
              {openingData.map((singleData) => (
                <Option key={singleData.id} value={singleData.id}>
                  {singleData.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="????????????"
            name="name"
            rules={[{ required: true, message: "?????????????????????!" }]}
            initialValue={name}
          >
            <Input placeholder="????????????" />
          </Form.Item>
          <Form.Item
            label="??????????????????"
            name="limit"
            rules={[{ required: true, message: "???????????????????????????!" }]}
            initialValue={parseInt(String(limit))}
          >
            <Select placeholder="????????????????????????">
              <Option value={0}>???</Option>
              <Option value={1}>???</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="??????????????????"
            name="location"
            rules={[{ required: true, message: "???????????????????????????!" }]}
            initialValue={location}
          >
            <Input placeholder="??????????????????" />
          </Form.Item>
          <Form.Item
            label="???????????????????????????:"
            name="dates"
            rules={[{ required: true, message: "??????????????????????????????!" }]}
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
            label="??????????????????:"
            name="start"
            rules={[{ required: true, message: "???????????????????????????!" }]}
            initialValue={moment(start, "YYYY-MM-DD HH:mm:ss")}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item
            label="?????????ID"
            name="refereeId"
            rules={[{ required: true, message: "??????????????????ID!" }]}
            initialValue={refereeId}
          >
            <Select placeholder="???????????????">
              {refereeData.map((singleData) => (
                <Option key={singleData.id} value={singleData.id}>
                  {singleData.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="??????????????????"
            name="unit"
            rules={[{ required: true, message: "???????????????????????????!" }]}
            initialValue={unit}
          >
            <Input placeholder="??????????????????" />
          </Form.Item>
          <Form.Item
            label="??????????????????"
            name="rule"
            rules={[{ required: true, message: "???????????????????????????!" }]}
            initialValue={rule}
          >
            <Input placeholder="????????????????????????..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProject;
