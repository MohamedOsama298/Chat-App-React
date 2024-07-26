import { Button, Input, Space } from "antd";
import { useState } from "react";
import { authorizedHttpInstance, httpInstance } from "../../network/baseUrl";

export default function MessageBar() {
  const [message, setMessage] = useState<string>("");
  function onSend() {
    authorizedHttpInstance.post("/messages", {
      message
    });
    setMessage("");
  }
  return (
    <div>
      <Space.Compact style={{ width: "100%" }}>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={onSend} type="primary">
          Send
        </Button>
      </Space.Compact>
    </div>
  );
}
