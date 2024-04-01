import { mongoErrorHandler } from "../helpers/errorHandler";
import businessModel from "../models/business/businessModel";
import { IBusiness, IMongoErrorHandler } from "../types/interfaces";

export async function createBusiness(
  values: IBusiness
): Promise<IBusiness | any> {
  try {
    const business = await businessModel.create(values);
    if (!business) {
      return null;
    }
    return business;
  } catch (error) {
    return mongoErrorHandler(error);
  }
}
