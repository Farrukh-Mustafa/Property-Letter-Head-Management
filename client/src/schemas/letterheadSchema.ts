import { z } from "zod";

export const letterheadSchema = z.object({
  plotNumber: z.string().min(1, "Plot Number is required."),
  blockNumber: z.string().min(1, "Block Number is required."),
  plotSize: z.string().min(1, "Plot Size is required."),
  memberName: z.string().min(1, "Name is required."),
  memberCnic: z
    .string()
    .min(15, "CNIC is required.")
    .regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format."),
  dealerOfficeName: z.string().optional(),
  dealerPhoneNumber: z.string().optional(),
  dealerCnic: z.string().optional()
});

export const letterheadApiResponseSchema = letterheadSchema.extend({
  letterHeadId: z.string(),
  date: z.string()
});

export type LetterHead = z.infer<typeof letterheadSchema>;
export type LetterHeadApiResponse = z.infer<typeof letterheadApiResponseSchema>;
