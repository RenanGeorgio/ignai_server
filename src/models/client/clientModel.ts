import mongoose from "../../database";
import contactsSchema from "./contactSchema";

const { Schema } = mongoose;

const clientsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  priority: {
    enum: ["Low", "Medium", "High"],
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "documents",
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  contact: {
    type: contactsSchema,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const clientModel = mongoose.model("clients", clientsSchema);

export default clientModel;
