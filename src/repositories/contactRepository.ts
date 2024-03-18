import { IAddress, IContactInfo } from "../types/interfaces";
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
      contacts: { $elemMatch: { email } },
    });

    if (client) {
      return null;
    }

    const createContact = await clientModel
      .findByIdAndUpdate(
        { _id: clientId },
        {
          $push: {
            contacts: {
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
      .select("contacts");

    return createContact.contacts;
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
          adresses: {
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

    return createAddress.adresses;
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
    const updateContact = await clientModel
      .findOneAndUpdate(
        {
          _id: clientId,
          "contacts._id": contactId,
        },
        {
          $set: {
            "contacts.$.contactName": contactName,
            "contacts.$.email": email,
            "contacts.$.status": status,
            "contacts.$.tel": tel,
            "contacts.$.state": state,
          },
        },
        { new: true }
      )
      .select("contacts");

    return updateContact?.contacts;
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}

export async function updateAddressInfo({
  clientId,
  _id: addressId,
  name,
  street,
  number,
  district,
  city,
  state,
  zipCode,
  isMain,
}: IAddress) {
  try {
    const updateAddress = await clientModel.findOneAndUpdate(
      {
        _id: clientId,
        "adresses._id": addressId,
      },
      {
        $set: {
          "adresses.$.name": name,
          "adresses.$.street": street,
          "adresses.$.number": number,
          "adresses.$.district": district,
          "adresses.$.city": city,
          "adresses.$.state": state,
          "adresses.$.zipCode": zipCode,
          "adresses.$.isMain": isMain,
        },
      },
      { new: true }
    );

    return updateAddress?.adresses;
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}

export async function deleteContact({ clientId, contactId, companyId }: any) {
  try {
    const deleteContact = await clientModel.findOneAndUpdate(
      { $and: [{ _id: clientId }, { companyId: companyId }] },
      { $pull: { contacts: { _id: contactId } } }
      // { new: true }
    );

    if (!deleteContact) {
      return null;
    }

    return {};
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}

export async function deleteAddress({ clientId, addressId, companyId }: any) {
  try {
    const deleteAddress = await clientModel.findOneAndUpdate(
      { $and: [{ _id: clientId }, { companyId: companyId }] },
      { $pull: { adresses: { _id: addressId } } }
    );

    if (!deleteAddress) {
      return null;
    }

    return {};
  } catch (error: any) {
    return mongoErrorHandler(error);
  }
}
