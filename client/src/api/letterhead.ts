import { axiosWithCredentials } from "@/api/axios";
import { type LetterHead, type letterheadSchema } from "@/schemas/letterheadSchema";
import type { Response } from "@/types/api";
import type { z } from "zod";

export const addLetterHead = async ({
  letterHeadId,
  payload
}: {
  letterHeadId: string;
  payload: z.infer<typeof letterheadSchema>;
}) => {
  const { plotNumber, blockNumber, plotSize, memberName, memberCnic, dealerOfficeName, dealerPhoneNumber, dealerCnic } =
    payload;
  return await axiosWithCredentials.post<Response>("/letterhead/add", {
    letterHeadId,
    plotNumber,
    blockNumber,
    plotSize,
    memberName,
    memberCnic,
    dealerOfficeName,
    dealerPhoneNumber,
    dealerCnic
  });
};

export const getLetterHead = async ({ id }: { id: string }) => {
  const response = await axiosWithCredentials.post<Response<LetterHead>>("/letterhead/get", { id });
  return response.data.data;
};
