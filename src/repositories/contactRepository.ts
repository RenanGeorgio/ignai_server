import { Mongoose } from "mongoose";
import contactModel from "../models/client/contactSchema";
import { IAddress, IContactInfo } from "../types/interfaces";
import { Error } from "mongoose";
import clientModel from "../models/client/clientModel";
import { mongoErrorHandler } from "../helpers/errorHandler";

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
      return null;
    }

    const createContact = await clientModel
      .findByIdAndUpdate(
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
      )
      .select("contact.contactInfo");

    return createContact.contact.contactInfo;
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}

export async function createNewAddress({
  clientId,
  name,
  street,
  number,
  district,
  city,
  state,
  zipCode,
}: IAddress) {
  try {
    const createAddress = await clientModel.findByIdAndUpdate(
      { _id: clientId },
      {
        $push: {
          "contact.address": {
            name,
            street,
            number,
            district,
            city,
            state,
            zipCode,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    );

    return createAddress;
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}

export async function updateContactInfo({
  clientId,
  _id: contactId,
  contactName,
  email,
  status,
  tel,
  state,
}: IContactInfo) {
  try {
    const updateContact = await clientModel.findOneAndUpdate(
      {
        _id: clientId,
        "contact.contactInfo._id": contactId,
      },
      {
        $set: {
          "contact.contactInfo.$.contactName": contactName,
          "contact.contactInfo.$.email": email,
          "contact.contactInfo.$.status": status,
          "contact.contactInfo.$.tel": tel,
          "contact.contactInfo.$.state": state,
        },
      },
      { new: true }
    ).select("contact.contactInfo");

    return updateContact?.contact.contactInfo;
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}