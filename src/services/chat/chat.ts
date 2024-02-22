import { Socket } from "socket.io";
import { io } from "../../app";

const ChatService = () => {

  let onlineUsers: Array = [];
  
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("addNewUser", (userId: string) => {
      !onlineUsers.some((user: any) => user.userId === userId)
      && onlineUsers.push({
        userId,
        socketId: socket.id
      });
      io.emit("onlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message: any) => {
      console.log("Message received", message)
      const receiver = onlineUsers.find((user: any) => user.userId === message.recipientId);
      console.log("Receiver", receiver)
      if (receiver) {
        io.to(receiver.socketId).emit("getMessage", message);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socket.id);
      io.emit("onlineUsers", onlineUsers);
      // onlineUsers.splice(onlineUsers.indexOf(socketId), 1);
    });
  });
};

export default ChatService;
