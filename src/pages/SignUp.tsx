import { Button, Form, FormProps, Input } from "antd";
import { httpInstance } from "../network/baseUrl";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
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
        navigate('/login')
      })
      .catch((err) => {
      console.log(err);
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
        label="Age"
        name="age"
        rules={[{ required: true, message: "Please input your Age" ,type:"number"}]}
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

      <Form.Item<FieldType>
        label="confirmPassword"
        name="confirmPassword"
        rules={[{ required: true, message: "Please input your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),]}
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
