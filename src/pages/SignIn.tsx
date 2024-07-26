import { Button, Form, FormProps, Input } from "antd";
import { httpInstance } from "../network/baseUrl";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  type FieldType = {
    username?: string;
    password?: string;
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    httpInstance
      .post("/auth/login", {
        userName: values.username,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("chat_app_token", res.data.access_token);
        navigate('/chat')
      })
      .catch((err) => {
        localStorage.removeItem("chat_app_token");
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
