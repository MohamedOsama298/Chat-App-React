import React from "react";
import { Card} from "antd";

interface MessageCard {
  body :string;
  sender :string;
}


const  MessageComponent:React.FC<MessageCard> = ({body,sender}) => {
  return (
        <Card title={sender} bordered={false} style={{ width: 300 }}>
          <p>{body}</p>
        </Card>
  );
}

export default MessageComponent;
