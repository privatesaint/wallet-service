import mongoose from "mongoose";

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0.0,
  },
  currency: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Wallet = mongoose.model("Wallet", walletSchema);
