import type { z } from "zod";
import { LetterHeadModel } from "../models/letterhead.model";
import { type addSchema } from "../schemas/letterhead.schema";

export const getLetterHeadById = async ({ id }: { id: string }) => {
  console.log("getLetterHeadById", id);
  return await LetterHeadModel.findOne({
    letterHeadId: id
  });
};
export const addNewLetterHead = async (payload: z.infer<typeof addSchema>) => {
  return await LetterHeadModel.create(payload);
};
