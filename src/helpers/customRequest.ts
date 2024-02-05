import { Request } from "express";
import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId | string;
    email: string;
    company: string;
}

export interface CustomRequest extends Request {
    user?: User;
}