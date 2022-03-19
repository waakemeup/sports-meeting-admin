import React from "react";
import { Button, Checkbox, Form, Input, Divider, message } from "antd";
import styles from "./index.module.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

interface Props {}

const Login = (props: Props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("登录成功");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("登录失败");
  };
  return (
    <>
      <div
        className={`flex flex-col items-center  justify-center w-screen h-screen bg-sky-300 ${styles["bgImg"]}`}
      >
        <p className="top-0 font-mono text-5xl font-bold text-rose-400">
          运动会信息管理系统
        </p>
        <Divider />
        <p className="top-0 mb-8 font-mono text-xl font-bold text-fuchsia-600">
          An information management system for university sports meeting
        </p>
        <Form
          layout="vertical"
          name="normal_login"
          // className="p-5 mt-12 rounded-lg bg-gradient-to-r from-cyan-100 to-teal-100 drop-shadow-2xl lg:w-screen lg:h-2/5 md:w-2/5"
          className="w-1/3 p-5 mt-12 rounded-lg bg-gradient-to-r from-cyan-100 to-teal-100 drop-shadow-2xl ldm:w-72 xxm:w-screen"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
          <Form.Item>
            <div className="flex flex-row items-center justify-between mdm:flex-col">
              <div>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="mr-6"
                  noStyle
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </div>
              <div>
                <a className="login-form-forgot" href="/register">
                  还没有账号?注册一个
                </a>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 mx-auto bg-sky-500 rounded-xl drop-shadow-2xl"
              onClick={() => {
                // TODO: 根据返回信息判断
                // message.success("登陆成功");
              }}
            >
              登录
            </Button>
            {/* <br />
            Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
