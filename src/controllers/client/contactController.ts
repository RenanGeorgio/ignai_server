import { Request, Response, NextFunction } from "express";
import {
  createNewAddress,
  createNewContact,
  deleteAddress,
  deleteContact,
  updateAddressInfo,
  updateContactInfo,
} from "../../repositories/contactRepository";
import { findUser } from "../../repositories/userRepository";
import { cepConverter } from "../../helpers/converters";

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
      zipCode: cepConverter(zipCode),
    });

    return res.status(200).send(address);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId, contactId } = req.params;

  try {
    const { contactName, email, status, tel, state } = req.body;
    if (!contactName || !email || !tel || !state) {
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
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId, addressId } = req.params;
  const { name, street, number, district, city, state, zipCode, isMain } =
    req.body;
  try {
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

    const addresses = await updateAddressInfo({
      clientId,
      _id: addressId,
      name,
      street,
      number,
      district,
      city,
      state,
      zipCode: cepConverter(zipCode),
      isMain,
    });

    if (!addresses) {
      return res.status(400).send({ message: "Contato não encontrado" });
    }

    return res.status(200).send(addresses);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const removeContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId, contactId } = req.params;
  const { userId } = req.body;
  try {
    const user = await findUser(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const contact = await deleteContact({
      clientId,
      contactId,
      companyId: user.companyId,
    });

    if (!contact) {
      return res.status(400).send({ message: "Contato não encontrado" });
    }

    return res.status(200).send({ message: "Contato removido com sucesso" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const removeAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId, addressId } = req.params;
  const { userId } = req.body;
  try {
    const user = await findUser(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const address = await deleteAddress({
      clientId,
      addressId,
      companyId: user.companyId,
    });

    if (!address) {
      return res.status(400).send({ message: "Endereço não encontrado" });
    }

    return res.status(200).send({ message: "Endereço removido com sucesso" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
