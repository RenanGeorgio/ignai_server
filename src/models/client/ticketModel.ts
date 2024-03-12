import mongoose from "../../database";

const { Schema } = mongoose;

const ticketSchema = new Schema({
  attendant: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    enum: [
      "Open",
      "Assigned",
      "InProgress",
      "WaitingForCustomer",
      "WaitingForThirdParty",
      "Resolved",
      "Closed",
      "Canceled",
    ],
    type: String,
    required: true,
  },
});

const ticketModel = mongoose.model("tickets", ticketSchema);

export default ticketModel;