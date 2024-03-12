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

const contactsSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  contactInfo: [contactInfoSchema],
  address: [addressSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const contactModel = mongoose.model("contacts", contactsSchema);

export default contactModel;
