import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  authorizationCode: {
    type: String,
    required: [true, "Authorization code is required"],
  },
  cardType: {
    type: String,
  },
  last4: {
    type: String,
  },
  expMonth: {
    type: String,
  },
  expYear: {
    type: String,
  },
  bin: {
    type: String,
  },
  bank: {
    type: String,
  },
  channel: {
    type: String,
  },
  reusable: {
    type: String,
  },
  signature: {
    type: String,
    required: [true, "Card signature is required"],
  },
  brand: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Card = mongoose.model("Card", cardSchema);
