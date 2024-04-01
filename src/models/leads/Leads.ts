import { randomUUID } from "crypto";
import mongoose from "../../database";

const { Schema } = mongoose;

const LeadsSchema = new Schema({
  companyId: {
    // ID da empresa que o lead está vinculado
    type: String,
    required: true,
  },
  title: {
    // Título do lead
    type: String,
    required: true,
  },
  items: [
    // Cards
    {
      title: {
        type: String,
        required: true,
      },
      comments: {
        type: String,
        required: false,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Leads = mongoose.model("Leads", LeadsSchema);

export default Leads;
