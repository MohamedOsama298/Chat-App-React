import { Button, Input, Space } from "antd";
import { useState } from "react";
import { httpInstance } from "../../network/baseUrl";

export default function MessageBar() {

  const [message, setMessage] = useState<string>('')
  function onSend(){
    httpInstance.post("/messages",{
      message: {
        id:`${message}`,
        title:"some",
        body:message
      }
    })
    setMessage('');
  }
  return (
    <div>
      <Space.Compact style={{ width: "100%" }}>
        <Input  value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <Button  onClick={onSend} type="primary">Send</Button>
      </Space.Compact>
    </div>
  );
}
