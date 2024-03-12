import { Schema } from "mongoose";

export interface IJwtPayload {
  sub: string,
  name: string
}

export interface IClient {
  name: string;
  email: string;
  tel: string;
  priority: string;
  sector: string;
  status?: boolean;
  contactInfo: IContactInfo;
  address: IAddress;
  companyId: string;
};

export interface IContactInfo {
  client: Schema.Types.ObjectId
  contactName: string;
  email: string;
  status: boolean;
  tel: string;
  state: string;
};

export interface IAddress {
  client: Schema.Types.ObjectId
  name: string;
  street: string;
  number: Number;
  district: string;
  city: string;
  state: string;
  zipCode: number;
};