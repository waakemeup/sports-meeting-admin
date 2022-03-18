import React from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import styles from "./index.module.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface Props {}

const Login = (props: Props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div
        className={`flex flex-col items-center  justify-center w-screen h-screen bg-sky-300 ${styles["bgImg"]}`}
      >
        <p className="top-0 font-mono font-bold text-5xl text-rose-400">
          运动会信息管理系统
        </p>
        <Divider />
        <p className="top-0 font-mono font-bold text-xl text-fuchsia-600 mb-8">
          An information management system for university sports meeting
        </p>
        <Form
          name="normal_login"
          className="bg-gradient-to-r from-cyan-200 to-teal-200 p-5 rounded-lg drop-shadow-2xl mt-12 lg:w-1/3 lg:h-1/3 md:w-2/5"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
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
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              className="border-none focus:border focus:border-teal-300"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="flex items-center justify-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* <br /> */}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-sky-500 w-2/3 mx-auto"
            >
              Log in
            </Button>
            <br />
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
