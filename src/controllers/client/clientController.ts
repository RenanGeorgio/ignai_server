import { Request, Response, NextFunction } from "express";
import { IAddress, IClient, IContactInfo } from "../../types/interfaces";
import {
  createNewClient,
  deleteClient,
  listClients,
  updateClient,
} from "../../repositories/clientRepository";
import { findUser } from "../../repositories/userRepository";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, tel, priority, sector }: IClient = req.body;

    if (!name || !email || !tel || !priority || !sector) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user = await findUser(req.body.userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const client = await createNewClient({
      companyId: user.companyId,
      name,
      email,
      tel,
      priority,
      sector,
    });

    if (!client) {
      return res.status(400).send({
        message: "Cliente Já existe!",
        success: false,
      });
    }

    return res.status(200).send(client);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUser(req.body.userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const client = await listClients(user.companyId);

    if (!client) {
      return res.status(400).send({ message: "Client not found" });
    }

    return res.status(200).send(client);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, tel, priority, sector, status }: IClient = req.body;
    const { clientId } = req.params;

    if (!name || !email || !tel || !priority || !sector) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user = await findUser(req.body.userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const client = await updateClient({
      _id: clientId,
      name,
      email,
      tel,
      priority,
      sector,
      status,
    });

    if (!client) {
      return res.status(400).send({
        message: "Cliente Já existe!",
        success: false,
      });
    }

    return res.status(200).send(client);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId } = req.params;
  const { userId } = req.body;

  try {
    if (!clientId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user = await findUser(req.body.userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const client = await deleteClient({ clientId, companyId: user.companyId });

    if (!client) {
      return res.status(400).send({
        message: "Cliente não existe!",
      });
    }

    return res.status(200).send({ message: "Cliente removido com sucesso!" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
