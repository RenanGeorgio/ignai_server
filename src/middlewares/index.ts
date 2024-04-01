import { NextFunction, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { CustomRequest, User as IUser } from "../helpers/customRequest";
import auth from "../config/auth";
import { IJwtPayload } from "../types/interfaces";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

const JWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(401).send();
    }
    const { sub: userId } = jsonwebtoken.verify(
      token,
      auth.secret_token as string
    ) as IJwtPayload;
    if (!userId) {
      return res.status(403).send({ message: "Invalid JWT." });
    }

    req.body = { ...req.body, userId };
    next();
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).send({ message: "Invalid JWT." });
    }
    return res.status(500).send({ message: err.message });
  }
};

const socketJWT = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    if (socket.handshake.auth.token === process.env.CHATBOT_SERVER_TOKEN) {
      return next();
    }
    else {
      const authHeader = socket.handshake.auth.token;
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) {
        next(new Error("Invalid JWT."));
      }
      const user = <IUser>(
        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET || "secret")
      );
      if (!user) {
        next(new Error("Invalid JWT."));
      }
      next();
    }

  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      next(new Error("Invalid JWT."));
    }
    next(err);
  }
};

const middlewares = { JWT, socketJWT };

export default middlewares;
