import React, { useEffect } from "react";
import { Card} from "antd";
import { Message } from "../../types/message";



const  MessageComponent:React.FC<Message> = ({body}) => {
  useEffect(()=>{
    console.log(body);
    
  },[])
  return (
        <Card bordered={false} style={{ width: 300 }}>
          <p>{body}</p>
        </Card>
  );
}

export default MessageComponent;
