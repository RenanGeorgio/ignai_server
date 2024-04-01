import { Types } from "mongoose";

export type UserInfo = {
  userId: Types.ObjectId;
  name: string;
};

export type OnlineUser = {
  userId: string;
  socketId: string;
};