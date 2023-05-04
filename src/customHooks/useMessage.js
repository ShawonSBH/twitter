import { MessageContext } from "../utils/Providers/MessageProvider";
import { useContext } from "react";

export const useMessage = () => {
  const { messages, newMessage, messageNotifications, sendMessage } =
    useContext(MessageContext);
  return { messages, newMessage, messageNotifications, sendMessage };
};
