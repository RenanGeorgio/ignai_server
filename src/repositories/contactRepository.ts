import { Mongoose } from "mongoose";
import contactModel from "../models/client/contactModel";
import { IAddress, IContactInfo } from "../types/interfaces";
import { Error } from "mongoose";

export async function createNewContact({
  client,
  contactName,
  email,
  status,
  tel,
  state,
}: IContactInfo) {
  const checkContact = await contactModel.findOne({ client: client });
  try {
    if (!checkContact) {
      await contactModel.create({
        client,
        contactInfo: {
          contactName,
          email,
          status,
          tel,
          state,
        },
      });
    } else {
      checkContact.contactInfo.push({
        contactName,
        email,
        status,
        tel,
        state,
      });
      await checkContact.save();
    }

    return checkContact;
  } catch (error: any) {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return {
        success: false,
        message: "Could not create user due to some invalid fields!",
        error: messages,
      };
    }
  }
}

export async function createNewAddress({
  client,
  name,
  street,
  number,
  district,
  city,
  state,
  zipCode,
}: IAddress) {
  try {
    const checkAddress = await contactModel.findOne({ client: client });

    if (!checkAddress) {
      await contactModel.create({
        client,
        address: {
          name,
          street,
          number,
          district,
          city,
          state,
          zipCode,
        },
      });
    } else {
      checkAddress.address.push({
        name,
        street,
        number,
        district,
        city,
        state,
        zipCode,
      });
      await checkAddress.save();
    }

    return checkAddress;
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return {
        success: false,
        message: "Could not create user due to some invalid fields!",
        error: messages,
      };
    }
  }
}

export async function findClientContact(clientId: string) {
  const contact = await contactModel.findOne({ client: clientId })
  return contact;
}