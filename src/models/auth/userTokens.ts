import { randomUUID } from "crypto";
import mongoose from "../../database";

const { Schema } = mongoose;

const userTokensSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserTokens = mongoose.model("UserTokens", userTokensSchema);

export default UserTokens;
