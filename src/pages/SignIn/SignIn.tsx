import { Button, Form, FormProps, Input, notification } from "antd";
import { httpInstance } from "../../network/baseUrl";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { NotificationType } from "../../types/NotificationTypes";
export default function SignIn() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };
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
        console.log(res.data);

        localStorage.setItem("chat_app_token", res.data.access_token);
        localStorage.setItem("chat_app_isLoggedIn", "true");
        openNotificationWithIcon("success", "Success", "Signed in");
        setTimeout(() => navigate("/chat"), 3000);
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon("error", "Error", "Error Logging in account");
        localStorage.removeItem("chat_app_token");
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="SignInForm"
        requiredMark="optional"
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
            Login
          </Button>
          <Button htmlType="button" onClick={() => navigate("/signup")}>
            Register
          </Button>
          <Button type="link" htmlType="button">
            Forgot Password?
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
