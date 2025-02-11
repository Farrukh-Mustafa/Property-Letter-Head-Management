import { z } from "zod";

export const addSchema = z.object({
  name: z.string().min(1, "Name is required."),
  cnic: z.string().min(1, "CNIC is required."),
  plotNumber: z.string().min(1, "Plot Number is required."),
  letterHeadId: z.string().min(1, "Letter Head ID is required.")
});

export const getSchema = z.object({
  id: z.string().min(1, "ID is required.")
});
