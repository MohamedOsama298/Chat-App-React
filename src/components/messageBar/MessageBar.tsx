import { Button, Input, Space } from "antd";
import { useState } from "react";
import { authorizedHttpInstance } from "../../network/baseUrl";
import { useQueryClient } from "@tanstack/react-query";

export default function MessageBar({ chatID }: { chatID: string }) {
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();
  console.log(chatID);

  function onSend() {
    authorizedHttpInstance
      .post("/messages", {
        message,
        chatID,
      })
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: ["chats"] });
        await queryClient.invalidateQueries({
          queryKey: [`chatMessages-${chatID}`],
        });
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
