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
    {
      content: {
        type: String,
        required: true,
      },
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
