import { useEffect, useState } from "react";
import { Message } from "../types/message";
import MessageComponent from "../components/message/MessageComponent";
import { httpInstance } from "../network/baseUrl";
import MessageBar from "../components/messageBar/MessageBar";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    httpInstance
      .get("/messages")
      .then((res) => {
        console.log(res);
        let messagesTemp:Message[] = [];
        res.data.forEach((elem:any)=>messagesTemp.push(elem.message));
        setMessages(messagesTemp)
        console.log(messages);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {messages.map((message) => (
        <MessageComponent
        key={message.id}
          title={message.title}
          body={message.body}
          id={message.id}
        />
      ))}
      <MessageBar/>
    </div>
  );
}
