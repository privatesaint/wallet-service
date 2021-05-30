import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  card: {
    type: Schema.ObjectId,
    ref: "Card",
  },
  amount: {
    type: Number,
  },
  reference: {
    type: String,
  },
  status: {
    type: String,
  },
  currency: {
    type: String,
  },
  channel: {
    type: String,
  },
  type: {
    type: String,
    enum: {
      values: ["credit", "debit"],
      message: "Invalid value",
    },
  },
  fees: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
  paidAt: {
    type: Date,
  },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
