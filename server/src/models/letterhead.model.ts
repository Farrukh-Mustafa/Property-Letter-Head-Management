import { Schema, model } from "mongoose";

const letterheadSchema = new Schema(
  {
    letterHeadId: {
      type: String,
      required: true,
      min: 1
    },
    date: {
      type: Date,
      default: Date.now
    },
    plotNumber: {
      type: String,
      required: true,
      min: 1
    },
    blockNumber: {
      type: String,
      required: true,
      min: 1
    },
    plotSize: {
      type: String,
      required: true,
      min: 1
    },
    memberName: {
      type: String,
      required: true,
      min: 1
    },
    memberCnic: {
      type: String,
      required: true,
      match: /^\d{5}-\d{7}-\d{1}$/
    },
    dealerOfficeName: {
      type: String
    },
    dealerPhoneNumber: {
      type: String
    },
    dealerCnic: {
      type: String,
      required: false,
      match: /^\d{5}-\d{7}-\d{1}$/
    }
  },
  { timestamps: true }
);

export const LetterHeadModel = model("LetterHead", letterheadSchema);
