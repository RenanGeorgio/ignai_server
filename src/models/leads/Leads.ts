import { randomUUID } from "crypto";
import mongoose from "../../database";

const { Schema } = mongoose;

const LeadsSchema = new Schema({
  companyId: {
    // ID da empresa que o lead está vinculado
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    enum: ["INITIAL_CONTACT", "DISCUSSIONS", "DECISION_MAKING", "CONTRACT"],
  },
  lead: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  leadOrigin: {
    type: String,
    required: true,
    enum: ["EMAIL", "WHATSAPP", "OTHER"],
  },
  company: {
    type: String,
  },
  idNumber: {
    // CPF ou CNPJ
    type: String,
    required: true,
  },
  assignedEmployees: {
    type: [String],
    required: true,
  },
  files: {
    type: [String],
    required: false,
  },
  activity: [
    {
      type: {
        userName: {
          type: String,
          required: true,
        },
        comment: {
          text: {
            type: String,
            required: true,
          },
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
      required: true,
    },
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
