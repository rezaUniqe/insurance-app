import { z } from "zod";

const formSubmissionDataSchema = z.object({
  id: z.string(),
  "Full Name": z.string().optional(),
  Age: z.number().int().nonnegative(),
  "Insurance Type": z.string().optional(),
  City: z.string().optional(),
  Gender: z.union([z.literal("Male"),z.literal("Female")]),
  Status: z.string().optional(),
});

export const formSubmissionResponseSchema = z.object({
  columns: z.array(z.string()),
  data: z.array(formSubmissionDataSchema),
});

export type FormSubmissionResponse = z.infer<
  typeof formSubmissionResponseSchema
>;

