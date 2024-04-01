import { Types } from "mongoose";
import { sign } from "jsonwebtoken";
import auth from "../config/auth";
import dayjs from "dayjs";
import UserTokens from "../models/auth/userTokens";
import { IJwtPayload } from "../types/interfaces";
import { UserInfo } from "../types/types";

const {
  secret_token,
  expires_in,
  secret_refresh_token,
  expires_in_refresh_token,
  expires_refresh_token_days,
} = auth;

const SessionService = async (userInfo: UserInfo) => {
  const { name, userId } = userInfo;

  const refreshTokenExpiresDate = dayjs()
    .add(expires_refresh_token_days, "days")
    .toDate();

  const token = sign({}, secret_token as string, {
    subject: userId.toString(),
    expiresIn: expires_in,
  });

  const refreshToken = sign({ name }, secret_refresh_token as string, {
    subject: userId.toString(),
    expiresIn: expires_in_refresh_token,
  });

  await UserTokens.create({
    userId,
    refreshToken,
    expiresDate: refreshTokenExpiresDate,
  });

  return { token, refreshToken };
};

export default SessionService;
