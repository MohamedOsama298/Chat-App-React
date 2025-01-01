import { Button, Form, FormProps, Input, notification } from "antd";
import { httpInstance } from "../../network/baseUrl";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { NotificationType } from "../../types/NotificationTypes";

export default function SignUp() {
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
    age?: number;
    password?: string;
    confirmPassword?: string;
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    httpInstance
      .post("/user", {
        userName: values.username,
        password: values.password,
        age: values.age,
      })
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Success",
          "Successfully Created account"
        );
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((err) => {
        openNotificationWithIcon(
          "error",
          "Error",
          "Error Creating account"
        );
        console.log(err);
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
        className="SignUpForm"
        requiredMark="optional"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          validateTrigger="onBlur"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your Age" }]}
          validateTrigger="onBlur"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          validateTrigger="onBlur"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="confirmPassword"
          name="confirmPassword"
          rules={[
            { required: true, message: "Passwords Must Match" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          validateTrigger="onBlur"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
