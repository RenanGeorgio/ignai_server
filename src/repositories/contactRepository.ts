import { Mongoose } from "mongoose";
import contactModel from "../models/client/contactSchema";
import { IAddress, IContactInfo } from "../types/interfaces";
import { Error } from "mongoose";
import clientModel from "../models/client/clientModel";

export async function createNewContact({
  clientId,
  contactName,
  email,
  status,
  tel,
  state,
}: IContactInfo) {
  try {
    const client = await clientModel.findOne({
      "contact.contactInfo": { $elemMatch: { email } },
    });

    if (client) {
      return {
        success: false,
        message: "Contact already exists",
      };
    }

    const createContact = await clientModel.findByIdAndUpdate(
      { _id: clientId },
      {
        $push: {
          "contact.contactInfo": {
            contactName,
            email,
            status,
            tel,
            state,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    );

    console.log(createContact);
    return createContact;
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
