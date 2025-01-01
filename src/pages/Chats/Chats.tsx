import { Skeleton } from "antd";
import "./styles.css";
import { fetchChats } from "./queries";
import { useQuery } from "@tanstack/react-query";
import ChatComponent from "../../components/chat/Chat";
import ChatSideBar from "../../components/chatSideBar";
import ErrorComponent from "../../components/error";
import { useState } from "react";
import { Chat } from "../../types/chat";
import { Navigate } from "react-router-dom";

export default function Chats() {
  const { data, isError } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const [ActiveChat, SetActiveChat] = useState<Chat>();

  function ActivateChat(id: string) {
    SetActiveChat(data?.find((activeChat) => activeChat.id === id));
  }
  if (data) {
    return (
      <div className="row">
        <div className="col-4">
          <ChatSideBar
            chats={data.map(({ name, messages, id }) => ({
              name,
              message: messages[messages.length - 1],
              id,
            }))}
            setActiveChat={ActivateChat}
          />
        </div>
        <div className="col">
          {ActiveChat && (
            <ChatComponent
              name={ActiveChat.name}
              id={ActiveChat.id}
              type={ActiveChat.type}
              members={ActiveChat.members}
              updatedAt={ActiveChat.updatedAt}
              messages={ActiveChat.messages}
            />
          )}
        </div>
      </div>
    );
  } else if (isError) {
    return <Navigate to="/" replace/>;
  } else return <Skeleton />;
}
