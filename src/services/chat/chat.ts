import { io } from "../../app";
import { OnlineUser } from "../../types/types";

const ChatService = () => {
  let onlineUsers: OnlineUser[] = [];

  io.on("connection", (socket) => {
    socket.on("addNewUser", (userId: string) => {
      !onlineUsers.some((user: any) => user.userId === userId) &&
        onlineUsers.push({
          userId,
          socketId: socket.id,
        });
      io.emit("onlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message: any) => {
      console.log(message)
      const receiver = onlineUsers.find(
        (user: any) => user.userId === message.recipientId
      );
      console.log(receiver)
      if (receiver) {
        console.log("receiver")
        io.to(receiver.socketId).emit("getMessage", message);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter(
        (user: any) => user.socketId !== socket.id
      );
      io.emit("onlineUsers", onlineUsers);
    });
  });
};

export default ChatService;
