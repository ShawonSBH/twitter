import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { authOptions } from "./auth/[...nextauth]";
import { createMessage } from "../../services/conversations/create-message.server";
import { mapId } from "../../utils/mapId";
//import { seeMessage } from "../../services/conversations/create-message.server";
import Users from "../../models/Users";
import { createMessageNotification } from "../../services/notifications/create-message-notification";
import connectMongo from "../../utils/db";
import { handleRequest } from "@/utils/request-handler";
import { seeMessage } from "../../services/conversations/seeMessage.server";
import mongoose from "mongoose";

export default handleRequest({
  GET: async (req, res) => {
    const { user } = await getServerSession(req, res, authOptions(req));
    await createSocketConnection(user.id, res);
    res.end();
  },
});

async function createSocketConnection(userId, res) {
  let io = res.socket.server.io;
  if (!io) {
    const io = new Server(res.socket.server);
    io.on("connection", async (socket) => {
      socket.on("sendMessage", async ({ content, sender, receiver }) => {
        console.log("New Message sent");
        const newMessage = await createMessage({
          sender: sender,
          receiver: receiver,
          text: content.text,
        });
        socket.to(receiver).emit("newMessage", newMessage);
      });

      socket.on("join", (room) => {
        console.log("room is ", room);
        if (!socket.rooms.has(room)) {
          socket.join(room);
        }
      });

      socket.on("sendNotification", async (notification) => {
        console.log("Socket Hit");
        createMessageNotification({
          userId: notification.receiver,
          notificationSenderId: notification.sender,
        });
      });

      socket.on("leave", (room) => {
        console.log("room is ", room);
        socket.leave(room);
      });

      socket.on("see_message", async (message) => {
        console.log("socket seen", message.id);
        seeMessage({ messageIds: [new mongoose.Types.ObjectId(message.id)] });
        socket.to(message.sender).emit("message_seen", message.receiver);
      });
    });
    res.socket.server.io = io;
  }
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
