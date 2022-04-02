import { LockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import ContentHeader from "../../components/contentheader/CotentHeader";

interface Props {}

const ChangePassword = (props: Props) => {
  const onFinish = async (values: any) => {
    message.warn(Math.random() > 0.5 ? "此功能尚未开发" : "非常抱歉");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("登录失败");
  };

  return (
    <>
      <Helmet>
        <title>我的信息 - 修改密码</title>
        <meta name="description" content="我的信息 修改密码" />
      </Helmet>
      <ContentHeader info={"我的信息"} info2={"修改密码"} />
      <Card
        title={<div className="text-center">修改密码</div>}
        className="border-t-4 rounded-sm border-t-blue-300"
      >
        <div className="text-2xl text-center">非常抱歉🥺此功能尚未完善</div>
        <div className="flex items-center justify-center">
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
              label="原始密码"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                className="border-none focus:border focus:border-teal-300"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              label="新的密码"
              name="new_password"
              rules={[
                { required: true, message: "Please input your new Password!" },
              ]}
            >
              <Input.Password
                className="border-none focus:border focus:border-teal-300"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirm_new_password"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your new Confirm Password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不匹配!"));
                  },
                }),
              ]}
            >
              <Input.Password
                className="border-none focus:border focus:border-teal-300"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
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
                重置
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 mx-auto bg-sky-500 rounded-xl drop-shadow-2xl"
                onClick={() => {}}
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default ChangePassword;
