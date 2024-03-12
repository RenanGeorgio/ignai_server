import { Request, Response } from "express";
import ChatClientModel from "../../models/chat/chatClientModel";

export const listClients = async (req: Request, res: Response) => {
  try {
    const clients = await ChatClientModel.find();

    return res.status(200).json(clients);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const createClient = async (req: Request, res: Response) => {
  const { name, lastName, email } = req.body;

  if (!name || !lastName || !email) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const client = new ChatClientModel({
      name,
      lastName,
      email,
    });

    const savedChatUser = await client.save();

    return res.status(200).json(savedChatUser);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const findClientByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const client = await ChatClientModel.findOne({
      email,
    });

    if (client) {
      return res.status(200).send(client);
    }

    return res.status(404).send("Chat user not found");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const findClientById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const client = await ChatClientModel.findOne({
      _id,
    });

    if (client) {
      return res.status(200).json(client);
    }

    return res.status(404).send("Chat user not found");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};