import Chat from "../../models/chat/chat";
import { Request, Response, NextFunction } from "express";

export const createChat = async (req: Request, res: Response) => {
  const { firstId, secondId } = req.body;

  if(!firstId || !secondId) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).send(chat);
    }

    const newChat = new Chat({
      members: [firstId, secondId],
    });

    const savedChat = await newChat.save();

    return res.status(200).send(savedChat);

  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const findUserChats = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });

    return res.status(200).send(chats);

  }
  catch (error: any) {
    res.status(500).send(error.message);
  }
}

export const getChat = async (req: Request, res: Response) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).send(chat);
    }

    return res.status(404).send("Chat not found");

  } catch (error: any) {
    res.status(500).send(error.message);
  }
};