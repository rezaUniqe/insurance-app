import { z } from "zod";

const visibilitySchema = z.object({
  dependsOn: z.string().describe("ID of the field this visibility depends on"),
  condition: z.enum(["equals"]).describe("Condition type for visibility"),
  value: z.string().describe("Value that triggers this visibility condition"),
});

const dynamicOptionsSchema = z.object({
  dependsOn: z.string().describe("ID of the field these options depend on"),
  endpoint: z.string().describe("API endpoint to fetch options from"),
  method: z.enum(["GET", "POST"]).describe("HTTP method to use"),
});

const validationSchema = z
  .object({
    min: z.number().optional().describe("Minimum value for number fields"),
    max: z.number().optional().describe("Maximum value for number fields"),
    pattern: z.string().optional().describe("RegExp pattern for validation"),
  })
  .strict();

const baseFieldSchema = z.object({
  id: z.string().describe("Unique identifier for the field"),
  label: z.string().describe("Display label for the field"),
  required: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether field is required"),
});

const textFieldSchema = baseFieldSchema.extend({
  type: z.literal("text"),
  validation: validationSchema.optional(),
});

const dateFieldSchema = baseFieldSchema.extend({
  type: z.literal("date"),
});

const numberFieldSchema = baseFieldSchema.extend({
  type: z.literal("number"),
  validation: validationSchema.optional(),
});

const selectFieldSchema = baseFieldSchema.extend({
  type: z.literal("select"),
  options: z.array(z.string()).optional(),
  dynamicOptions: dynamicOptionsSchema.optional(),
  visibility: visibilitySchema.optional(),
});

const radioFieldSchema = baseFieldSchema.extend({
  type: z.literal("radio"),
  options: z.array(z.string()),
  visibility: visibilitySchema.optional(),
});

const checkboxFieldSchema = baseFieldSchema.extend({
  type: z.literal("checkbox"),
  options: z.array(z.string()),
});
const noneGroupFieldSchema = z.discriminatedUnion("type", [
  textFieldSchema,
  dateFieldSchema,
  numberFieldSchema,
  selectFieldSchema,
  radioFieldSchema,
  checkboxFieldSchema,
]);
const groupFieldSchema = baseFieldSchema.extend({
  type: z.literal("group"),
  fields: z.array(noneGroupFieldSchema),
});

const fieldSchema = z.discriminatedUnion("type", [
  textFieldSchema,
  dateFieldSchema,
  numberFieldSchema,
  selectFieldSchema,
  radioFieldSchema,
  checkboxFieldSchema,
  groupFieldSchema,
]);

export const formSchema = z.object({
  formId: z.string(),
  title: z.string(),
  fields: z.array(fieldSchema),
});

export const formResponseSchema = formSchema.array();

export type DynamicFormResponse = z.infer<typeof formResponseSchema>;
export type DynamicForm = z.infer<typeof formSchema>;
export type DynamicFormField = z.infer<typeof fieldSchema>;

export {
  fieldSchema,
  visibilitySchema,
  dynamicOptionsSchema,
  validationSchema,
};
