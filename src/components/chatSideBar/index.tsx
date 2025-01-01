import React, { useState } from "react";
import SingleChatElem from "./SingleChatElem";
import { Menu, MenuProps, Space } from "antd";
import {
  LogoutOutlined,
  SearchOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { Message } from "../../types/message";
import SearchTab from "./searchTab";
import { useNavigate } from "react-router-dom";
interface ChatSingleElem {
  name: string;
  message: Message;
  id: string;
}

interface Chats {
  chats: ChatSingleElem[];
  setActiveChat: (id: string) => void;
}
const ChatSideBar: React.FC<Chats> = ({ chats, setActiveChat }) => {
  const [current, setCurrent] = useState<string>("chats");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("chat_app_token");
    localStorage.removeItem("chat_app_isLoggedIn");
    setTimeout(() => navigate("/"), 1000);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    {
      key: "chats",
      icon: <WechatOutlined />,
    },
    {
      key: "app",
      icon: <SearchOutlined />,
    },
    {
      key: "logout",
      icon: <LogoutOutlined onClick={logout} />,
      danger: true,
      title: "Logout",
    },
  ];

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ marginBottom: "2px" }}
      />
      <div>
        {current === "chats" ? (
          <Space className="chatSideBar" direction="vertical">
            {chats.map((chat, index) => (
              <SingleChatElem
                name={chat.name}
                message={chat.message}
                id={chat.id}
                key={index}
                setActiveChat={setActiveChat}
              />
            ))}
          </Space>
        ) : (
          <SearchTab />
        )}
      </div>
    </div>
  );
};

export default ChatSideBar;
