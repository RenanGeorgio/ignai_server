import { Request, Response, NextFunction } from "express";
import { createNewAddress, createNewContact, findClientContact } from "../../repositories/contactRepository";

export const createContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { client, contactName, email, status, tel, state } = req.body;

    if (!client || !contactName || !email || !tel || !state) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const contact = await createNewContact({
      client,
      contactName,
      email,
      status,
      tel,
      state,
    });

    return res.status(200).send(contact);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { client, name, street, number, district, city, state, zipCode } = req.body;

    if (!client || !name || !street || !number || !district || !city || !state || !zipCode) {
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

export const findContact = async (req: Request, res: Response, next: NextFunction) => {
  const { client } = req.params;

  try {
    const contact = await findClientContact(client);
    
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    return res.status(200).send(contact);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}