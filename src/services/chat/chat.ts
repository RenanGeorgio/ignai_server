import { io } from "../../app";
import { OnlineUser } from "../../types/types";
import middlewares from "../../middlewares";
            // connect to second app
const ChatService = () => {
  let onlineUsers: OnlineUser[] = [];

  io.on("connection", (socket) => {
    console.log("connected")
    socket.on("addNewUser", (userId: string) => {
      !onlineUsers.some((user: any) => user.userId === userId) &&
        onlineUsers.push({
          userId,
          socketId: socket.id,
        });
      io.emit("onlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message: any) => {
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

    socket.on("newClientChat", (data: any) => {
      // avisar o front que um novo chat foi criado
      io.emit("newUserChat", data);
    });
  });
};

export default ChatService;
