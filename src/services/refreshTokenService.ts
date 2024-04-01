import { sign, verify } from "jsonwebtoken";
import UserTokens from "../models/auth/userTokens";
import auth from "../config/auth";
import dayjs from "dayjs";
import { IJwtPayload } from "../types/interfaces";

const RefreshTokenService = async (refreshToken: string) => {
  const {
    secret_token,
    expires_in,
    secret_refresh_token,
    expires_in_refresh_token,
    expires_refresh_token_days,
  } = auth;

  const { sub: userId, name } = verify(
    refreshToken,
    secret_refresh_token as string
  ) as IJwtPayload;

  const userTokens = await UserTokens.findOne({
    $and: [{ refreshToken }, { userId }],
  });

  if (!userTokens) {
    throw new Error("Refresh token não encontrado");
  }

  const { _id } = userTokens;

  await UserTokens.deleteOne({ _id });

  const newRefreshToken = sign({ name }, secret_refresh_token as string,
    { expiresIn: expires_in_refresh_token, subject: userId }
  );

  console.log(newRefreshToken)
  const refreshTokenExpiresDate = dayjs()
    .add(expires_refresh_token_days, "days")
    .toDate();

  await UserTokens.create({
    userId: userId,
    refreshToken: newRefreshToken,
    expiresDate: refreshTokenExpiresDate,
  });

  const newToken = sign({}, secret_token as string, {
    subject: userId,
    expiresIn: expires_in,
  });

  return { refreshToken: newRefreshToken, token: newToken };
};

export default RefreshTokenService;
