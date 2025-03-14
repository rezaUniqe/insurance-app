import { z } from 'zod';

// For field visibility conditions
const visibilitySchema = z.object({
  dependsOn: z.string().describe("ID of the field this visibility depends on"),
  condition: z.enum(["equals"]).describe("Condition type for visibility"),
  value: z.string().describe("Value that triggers this visibility condition")
});

// For fields with dynamic options loaded from an API
const dynamicOptionsSchema = z.object({
  dependsOn: z.string().describe("ID of the field these options depend on"),
  endpoint: z.string().describe("API endpoint to fetch options from"),
  method: z.enum(["GET", "POST"]).describe("HTTP method to use")
});

// For field validation rules
const validationSchema = z.object({
  min: z.number().optional().describe("Minimum value for number fields"),
  max: z.number().optional().describe("Maximum value for number fields"),
  pattern: z.string().optional().describe("RegExp pattern for validation")
}).strict();

// ====== Field Schemas ======

// Base field properties shared by all field types
const baseFieldSchema = z.object({
  id: z.string().describe("Unique identifier for the field"),
  label: z.string().describe("Display label for the field"),
  required: z.boolean().optional().default(false).describe("Whether field is required")
});

// Forward declaration for the recursive field schema

// Schema for text input fields
const textFieldSchema = baseFieldSchema.extend({
  type: z.literal('text'),
  validation: validationSchema.optional()
});

// Schema for date fields
const dateFieldSchema = baseFieldSchema.extend({
  type: z.literal('date')
});

// Schema for number fields
const numberFieldSchema = baseFieldSchema.extend({
  type: z.literal('number'),
  validation: validationSchema.optional()
});

// Schema for select dropdown fields
const selectFieldSchema = baseFieldSchema.extend({
  type: z.literal('select'),
  options: z.array(z.string()).optional(),
  dynamicOptions: dynamicOptionsSchema.optional(),
  visibility: visibilitySchema.optional()
});

// Schema for radio button fields
const radioFieldSchema = baseFieldSchema.extend({
  type: z.literal('radio'),
  options: z.array(z.string()),
  visibility: visibilitySchema.optional()
});

// Schema for checkbox fields
const checkboxFieldSchema = baseFieldSchema.extend({
  type: z.literal('checkbox'),
  options: z.array(z.string())
});

// Schema for grouped fields (which can contain other fields)
const groupFieldSchema = baseFieldSchema.extend({
  type: z.literal('group'),
  fields: z.lazy(() => z.array(z.any()))
});

// Combined field schema using union type
const fieldSchema = z.discriminatedUnion("type", [
  textFieldSchema,
  dateFieldSchema,
  numberFieldSchema,
  selectFieldSchema,
  radioFieldSchema,
  checkboxFieldSchema,
  groupFieldSchema
]);




export const formSchema=z.array(z.object({
  formId: z.string(),
  title: z.string(),
  fields: z.array(fieldSchema)
}));

export {
  fieldSchema,
  visibilitySchema,
  dynamicOptionsSchema,
  validationSchema,
};