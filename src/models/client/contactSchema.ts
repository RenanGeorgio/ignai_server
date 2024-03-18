import mongoose from "../../database";

const { Schema } = mongoose;

const contactInfoSchema = new Schema({
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, default: true },
  tel: { type: String, required: true },
  state: { type: String, required: true },
});

const addressSchema = new Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: Number, required: true },
  isMain: { type: Boolean, default: false },
});

export { contactInfoSchema, addressSchema };