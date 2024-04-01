import { Types } from "mongoose";

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
  contacts?: IContactInfo;
  adresses?: IAddress;
  companyId: string;
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
  _id?: string;
  clientId?: String
  name: string;
  street: string;
  number: Number;
  district: string;
  city: string;
  state: string;
  zipCode: number;
  isMain?: boolean;
};

export interface IBusiness {
  _id?: Types.ObjectId;
  client: Types.ObjectId;
  assignedTo: Types.ObjectId[];
  title: string;
  description: string;
  sku: string;
  barCode: string;
  price: number;
  includeTax: boolean;
  files: string[];
  status: string;
};

export interface IMongoErrorHandler {
  success: boolean;
  message: string;
  error: string[] | any;
};
