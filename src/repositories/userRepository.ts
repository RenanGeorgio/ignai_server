import User from "../models/user/userModel";

export async function findUser(userId: string) {
  const user = await User.findById(userId);
  return user;
}