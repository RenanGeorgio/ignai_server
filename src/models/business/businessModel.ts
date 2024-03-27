import mongoose from "../../database";

const { Schema } = mongoose;

const businessSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  ],
  sku: {
    type: String,
    required: true,
  },
  barCode: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  includeTax: {
    type: Boolean,
    required: true,
  },
  files: [],
  status: {
    enum: [
      "Discovery",
      "Proposal",
      "Negotiation",
      "Complete",
      "Rejected",
      "Accepted",
      "OnHold",
    ],
    type: String,
    required: true,
  },
});

const businessModel = mongoose.model("business", businessSchema);

export default businessModel;
