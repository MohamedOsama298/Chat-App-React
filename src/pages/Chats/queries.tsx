import { authorizedHttpInstance } from "../../network/baseUrl";
import { Chat } from "../../types/chat";

export const fetchChats = () =>
  authorizedHttpInstance
    .get("/chat/user")
    .then((res) => {
      console.log(res);
      let chatsTemp: Chat[] = [];
      res.data.forEach((elem: any) =>
        chatsTemp.push({
          name: elem.name,
          id: elem.chatID,
          type: elem.type,
          members: elem.members,
          updatedAt: elem.updatedAt,
          messages: elem.messages,
        })
      );
      return chatsTemp;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Unauthorized");
    });
