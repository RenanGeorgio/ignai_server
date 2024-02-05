import User from "../../models/user/User";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../helpers/customRequest";
import authApi from "../../services/authApi";
import SessionService from "../../services/sessionService";
import RefreshTokenService from "../../services/refreshTokenService";
import { AxiosError } from "axios";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const response = await authApi("/login-ignai", {
      method: "POST",
      data: {
        username: email,
        password: password,
      },
    });

    if (response.status === 200) {
      const { _id, name } = user;
      const { token, refreshToken } = await SessionService({
        userId: _id,
        name,
      });

      return res.status(200).send({ token, refreshToken });
    }
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const { response } = error as AxiosError;

      if (response?.status == 400 || response?.status == 401) {
        return res.status(401).send({ message: "Unauthorized" });
      }
    }
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const refreshTokenService = await RefreshTokenService(refreshToken);
    return res.json({
      refreshToken: refreshTokenService.refreshToken,
      token: refreshTokenService.token,
    });
  } catch (error) {
    next(error);
  }
};
