import { axiosWithCredentials } from "@/api/axios";
import { type LetterHead, type letterheadSchema } from "@/schemas/letterheadSchema";
import type { Response } from "@/types/api";
import type { z } from "zod";

export const addLetterHead = async (payload: z.infer<typeof letterheadSchema>) => {
  const { name, cnic, plotNumber, letterHeadId } = payload;
  return await axiosWithCredentials.post<Response>("/letterhead/add", { name, cnic, plotNumber, letterHeadId });
};

export const getLetterHead = async ({ id }: { id: string }) => {
  const response = await axiosWithCredentials.post<Response<LetterHead>>("/letterhead/get", { id });
  return response.data.data;
};
