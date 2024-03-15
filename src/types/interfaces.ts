import { Schema } from "mongoose";

export interface IJwtPayload {
  sub: string,
  name: string
}

export interface IClient {
  _id?: string;
  name: string;
  email: string;
  tel: string;
  priority: string;
  sector: string;
  status?: boolean;
  contact?: IContactInfo;
  companyId: string;
};

export interface IContact {
  contactInfo: IContactInfo;
  address: IAddress;
};

export interface IContactInfo {
  _id?: string;
  clientId?: String;
  contactName: string;
  email: string;
  status?: boolean;
  tel: string;
  state: string;
};

export interface IAddress {
  clientId?: String
  name: string;
  street: string;
  number: Number;
  district: string;
  city: string;
  state: string;
  zipCode: number;
};