import { Card } from "antd";
import React from "react";
import { Message } from "../../types/message";

interface chatSingleElem {
  name: string;
  message: Message;
  id: string;
  setActiveChat: (id: string) => void;
}
const SingleChatElem: React.FC<chatSingleElem> = ({
  name,
  message,
  id,
  setActiveChat,
}) => {
  return (
    <div
      className="card"
      onClick={() => setActiveChat(id)}
    >
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {message && (
          <p className="card-text">{`${message.sender.userName} : ${message.body}`}</p>
        )}
      </div>
    </div>
  );
};

export default SingleChatElem;
