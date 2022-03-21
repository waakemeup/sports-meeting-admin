import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Divider, message, Select } from "antd";
import styles from "./index.module.scss";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const { Option } = Select;

interface Props {}

const Register = (props: Props) => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { confirm, ...data } = values;
    console.log("Success:", data);
    await axios
      .post(`/register`, data)
      .then((res) => {
        if (res.status === 200) {
          message.success("注册成功");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          message.error("出了一些问题...");
        }
      })
      .catch((err) => {
        console.error(err);
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
      <Helmet>
        <title>运动会-注册</title>
        <meta name="description" content="运动会用户注册" />
      </Helmet>
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
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名!" }]}
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
            rules={[
              { required: true, message: "请输入密码!" },
              {
                min: 8,
                max: 16,
                message: "密码长度在8到16之间",
              },
            ]}
            hasFeedback
          >
            <Input.Password
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
              {
                min: 8,
                max: 16,
                message: "验证密码长度也在8到16之间",
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
            <Input.Password
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
              <Option value={0}>宜宾校区</Option>
              <Option value={1}>地球科学学院</Option>
              <Option value={2}>能源学院</Option>
              <Option value={3}>环境与土木工程学院</Option>
              <Option value={4}>地球物理学院</Option>
              <Option value={5}>核技术与自动化工程学院</Option>
              <Option value={6}>材料与化学化工学院</Option>
              <Option value={7}>管理科学学院</Option>
              <Option value={8}>马克思主义学院</Option>
              <Option value={9}>外国语学院</Option>
              <Option value={10}>文法学院</Option>
              <Option value={11}>商学院</Option>
              <Option value={12}>传播科学与艺术学院</Option>
              <Option value={13}>体育学院</Option>
              <Option value={14}>计算机与网络安全学院(牛津布鲁克斯学院)</Option>
              <Option value={15}>旅游与城乡规划学院</Option>
              <Option value={16}>生态环境学院</Option>
              <Option value={17}>数理学院</Option>
              <Option value={18}>机电工程学院</Option>
              <Option value={19}>研究生院</Option>
              {/* <Option value="other">Other</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: "请选择你的性别!" }]}
          >
            <Select placeholder="选择你的性别">
              <Option value={0}>男</Option>
              <Option value={1}>女</Option>
            </Select>
          </Form.Item>

          <div className="mb-2 text-center ">
            <a href="/login" className="font-mono text-red-500">
              已经有账号了,前去登录
            </a>
          </div>

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
