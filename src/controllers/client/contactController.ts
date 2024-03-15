import { Request, Response, NextFunction } from "express";
import {
  createNewAddress,
  createNewContact,
  updateContactInfo,
} from "../../repositories/contactRepository";
import { findUser } from "../../repositories/userRepository";

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const { contactName, email, tel, state, userId } = req.body;

    if (!contactName || !email || !tel || !state) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user = await findUser(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const contact = await createNewContact({
      clientId,
      contactName,
      email,
      tel,
      state,
    });

    if (!contact) {
      return res.status(400).send({
        message: "Contato já existe!",
        success: false,
      });
    }

    return res.status(201).send(contact);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientId } = req.params;
    const { name, street, number, district, city, state, zipCode } = req.body;

    if (
      !name ||
      !street ||
      !number ||
      !district ||
      !city ||
      !state ||
      !zipCode
    ) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const address = await createNewAddress({
      clientId,
      name,
      street,
      number: Number(number),
      district,
      city,
      state,
      zipCode: typeof zipCode === "string" ? parseInt(zipCode) : zipCode,
    });

    return res.status(200).send(address);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateContact = async (req: Request, res: Response, next: NextFunction) => {
  const { clientId, contactId } = req.params;

  try {
    const { contactName, email, status, tel, state } = req.body;
    if(!contactName || !email || !tel || !state) {
      return res.status(400).send({ message: "Missing required fields" });
    }
  
    const contact = await updateContactInfo({
      clientId,
      _id: contactId,
      contactName,
      email,
      status,
      tel,
      state,
    });
  
    if (!contact) {
      return res.status(400).send({ message: "Contato não encontrado" });
    }
    
    return res.status(200).send(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};