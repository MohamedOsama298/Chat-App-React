import { Message } from "./message";

export type Chat = {
  id: string;
  name: string;
  type: "Group" | "Private";
  members: string[];
  updatedAt: string;
  messages: Message[];
};
