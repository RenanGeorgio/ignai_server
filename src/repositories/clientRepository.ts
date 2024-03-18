import clientsModel from "../models/client/clientModel";
import { IClient } from "../types/interfaces";
import contactModel from "../models/client/contactSchema";
import { findUser } from "./userRepository";
import { mongoErrorHandler } from "../helpers/errorHandler";

export async function createNewClient({
  name,
  email,
  tel,
  priority,
  sector,
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

    await session.commitTransaction();

    return client[0];
  } catch (error) {
    await session.endSession();
    return mongoErrorHandler(error);
  } finally {
    await session.endSession();
  }
}

export async function listClients(companyId: string) {
  const clients = await clientsModel.find({ companyId });
  return clients;
}

export async function updateClient({
  _id,
  name,
  email,
  tel,
  priority,
  sector,
  status,
}: Omit<IClient, "companyId">) {
  try {
    const client = await clientsModel.findByIdAndUpdate(
      { _id },
      {
        name,
        email,
        tel,
        priority,
        sector,
        status,
      },
      { new: true }
    );

    return client;
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}

export async function deleteClient({ clientId, companyId }: any) {
  try {
    const client = await clientsModel.findOneAndDelete({
      $and: [{ _id: clientId }, { companyId }],
    })

    console.log(client);
    if (!client) return null;

    return {};
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}
