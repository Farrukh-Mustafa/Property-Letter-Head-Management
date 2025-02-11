import { z } from "zod";

export const addSchema = z.object({
  letterHeadId: z.string().min(1, "Letterhead ID is required."),
  plotNumber: z.string().min(1, "Plot Number is required."),
  blockNumber: z.string().min(1, "Block Number is required."),
  plotSize: z.string().min(1, "Plot Size is required."),
  memberName: z.string().min(1, "Name is required."),
  memberCnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format."),
  dealerOfficeName: z.string().optional(),
  dealerPhoneNumber: z.string().optional(),
  dealerCnic: z.string().optional()
});

export const getSchema = z.object({
  id: z.string().min(1, "ID is required.")
});
