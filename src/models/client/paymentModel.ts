import mongoose from "../../database";

const { Schema } = mongoose;

const paymentSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
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

const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;
