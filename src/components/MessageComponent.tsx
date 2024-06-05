import React from "react";
import { Card} from "antd";
import { Message } from "../types/message";



const  MessageComponent:React.FC<Message> = ({title,body}) => {
  return (
        <Card title={title} bordered={false} style={{ width: 300 }}>
          <p>{body}</p>
        </Card>
  );
}

export default MessageComponent;
