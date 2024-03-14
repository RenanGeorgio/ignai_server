import { Request, Response, NextFunction } from "express";
import { createNewAddress, createNewContact } from "../../repositories/contactRepository";
import { findUser } from "../../repositories/userRepository";

export const createContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { client } = req.params;
    const { contactName, email, tel, state, userId } = req.body;

    if (!contactName || !email || !tel || !state) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user = await findUser(userId);
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    const contact = await createNewContact({
      clientId: client,
      contactName,
      email,
      tel,
      state,
    });

    if(!contact?.success) {
      return res.status(400).send(contact);
    }

    return res.status(200).send(contact);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { client } = req.params;
    const { name, street, number, district, city, state, zipCode } = req.body;

    if (!name || !street || !number || !district || !city || !state || !zipCode) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const address = await createNewAddress({
      client,
      name,
      street,
      number,
      district,
      city,
      state,
      zipCode,
    });

    return res.status(200).send(address);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}