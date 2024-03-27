import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import server from "./server";
import { Server } from "socket.io";
import middlewares from "./middlewares";
const PORT = process.env.PORT || 7000;
const HOST = process.env.HOST || "http://localhost";

server.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

const io = new Server(server, {
  cors: {   /// front e chatbot server
    origin: ["http://localhost:3000", "http://localhost:8000"],
  },
});

io.use(middlewares.socketJWT);
import "./services";

export { io, server as app };