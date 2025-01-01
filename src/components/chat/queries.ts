import { authorizedHttpInstance } from "../../network/baseUrl";
import { Message } from "../../types/message";

export const fetchMesages = (chatID: string) => 
  authorizedHttpInstance
    .get(`/messages?chatID=${chatID}`)
    .then((res) => {
      console.log(res);
      let messagesTemp: Message[] = [];
      res.data.forEach((elem: any) =>
        messagesTemp.push({
          body: elem.body,
          _id: elem._id,
          sender: elem.sender,
          createdAt: elem.createdAt,
        })
      );
      return messagesTemp;
    })
    .catch((err) => {
      console.log(err);
      let messagesTemp: Message[] = [];
      return messagesTemp;
    });
