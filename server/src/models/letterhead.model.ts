import { Schema, model } from "mongoose";

const letterheadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 1,
      max: 24
    },
    cnic: {
      type: String,
      required: true,
      unique: true
    },
    plotNumber: {
      type: String,
      required: true,
      min: 1
    },
    letterHeadId: {
      type: String,
      required: true,
      min: 1
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const LetterHeadModel = model("LetterHead", letterheadSchema);
