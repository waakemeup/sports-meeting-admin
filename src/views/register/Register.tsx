import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Divider, message, Select } from "antd";
import styles from "./index.module.scss";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import axios from "../../api";

const { Option } = Select;

interface Props {}

const Register = (props: Props) => {
  const onFinish = (values: any) => {
    const { confirm, ...data } = values;
    console.log("Success:", data);
    axios
      .post(`/register`, data)
      .then((res) => {
        if (res.status === 200) {
          message.success("注册成功");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("出了一些小问题...");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("注册失败");
    setTimeout(() => {
      message.warn("请填写必填项");
    }, 800);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center  justify-center w-screen h-screen bg-sky-300 ${styles["bgImg"]}`}
      >
        <Form
          layout="vertical"
          name="normal_login"
          // className="p-5 mt-12 rounded-lg bg-gradient-to-r from-cyan-100 to-teal-100 drop-shadow-2xl lg:w-1/3 lg:h-2/5 md:w-2/5"
          className="w-1/3 p-5 mt-12 rounded-lg bg-gradient-to-r from-cyan-100 to-teal-100 drop-shadow-2xl ldm:w-72 xxm:w-screen"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="mb-3 font-sans text-3xl font-extrabold text-center">
            用户注册
          </div>
          <Form.Item
            label="学号"
            name="no"
            rules={[{ required: true, message: "请输入学号!" }]}
          >
            <Input
              className="border-none focus:border focus:border-teal-300"
              prefix={<IdcardOutlined />}
              placeholder="Student ID"
            />
          </Form.Item>
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input
              className="border-none focus:border focus:border-teal-300"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
            hasFeedback
          >
            <Input
              className="border-none focus:border focus:border-teal-300"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请确认你的密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不匹配!"));
                },
              }),
            ]}
          >
            <Input
              className="border-none focus:border focus:border-teal-300"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password_Confirm"
            />
          </Form.Item>
          <Form.Item
            name="department"
            label="院系"
            rules={[{ required: true, message: "请选择你所在的院系!" }]}
          >
            <Select placeholder="选择你所在的院系">
              {/* TODO: 这里要把value换成0或者1 */}
              <Option value="学院1">学院1</Option>
              <Option value="学院2">学院2</Option>
              <Option value="学院3">学院3</Option>
              <Option value="学院4">学院4</Option>
              <Option value="学院5">学院5</Option>
              <Option value="学院6">学院6</Option>
              <Option value="学院7">学院7</Option>
              <Option value="学院8">学院8</Option>
              <Option value="学院9">学院9</Option>
              <Option value="学院10">学院10</Option>
              {/* <Option value="other">Other</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: "请选择你的性别!" }]}
          >
            <Select placeholder="选择你的性别">
              {/* TODO: 这里要把value换成0或者1 */}
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              {/* <Option value="other">Other</Option> */}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 mx-auto bg-sky-500 rounded-xl drop-shadow-2xl"
              onClick={() => {
                // TODO: 根据返回信息判断
                // message.success("注册成功");
              }}
            >
              注册
            </Button>
            {/* <br />
        Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
