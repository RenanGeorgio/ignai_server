import clientsModel from "../models/client/clientModel";
import { IClient } from "../types/interfaces";
import contactModel from "../models/client/contactModel";
import { Error } from "mongoose";
import { findUser } from "./userRepository";

export async function createNewClient({
  name,
  email,
  tel,
  priority,
  sector,
  contactInfo,
  address,
  companyId,
}: IClient) {
  const session = await clientsModel.startSession();
  session.startTransaction();

  try {
    const checkIfClientExists = await clientsModel.findOne({
      $and: [{ email }, { companyId }],
    });

    if (checkIfClientExists) return null;

    const client = await clientsModel.create(
      [
        {
          name,
          email,
          tel,
          priority,
          sector,
          companyId,
        },
      ],
      { session }
    );

    const clientId = client[0]._id;

    const contact = await contactModel.create(
      [{ client: clientId, contactInfo, address }],
      { session }
    );

    await session.commitTransaction();

    return client[0];
  } catch (error) {
    await session.endSession();
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return {
        success: false,
        message: "Could not create user due to some invalid fields!",
        error: messages,
      };
    }
  } finally {
    await session.endSession();
  }
}

export async function listClients(companyId: string) {
  const clients = await clientsModel.find({ companyId });
  return clients;
}