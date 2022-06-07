import { Button, Form, Input, message, Spin } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginStore } = useStore();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    loginStore.siginIn(values).then((res) => {
      if (res.status === 1) {
        message.error(res.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      message.success(res.message);
      navigate("/");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <Spin spinning={loading}>
        <h1>Hello, Panthera world !</h1>
        <Form
          validateTrigger={["onBlur", "onChange"]}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="login-form"
        >
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
                validateTrigger: "onBlur",
              },
            ]}
            className="login-item"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
            className="login-item"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
