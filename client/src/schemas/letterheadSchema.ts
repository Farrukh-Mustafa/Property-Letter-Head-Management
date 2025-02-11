import { z } from "zod";

export const letterheadSchema = z.object({
  name: z.string().min(1, "Name is required."),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format."),
  plotNumber: z.string().min(1, "Plot Number is required."),
  letterHeadId: z.string().min(1, "Letterhead ID is required.")
});

export type LetterHead = z.infer<typeof letterheadSchema>;
