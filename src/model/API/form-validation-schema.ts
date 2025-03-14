import { z, ZodArray, ZodEffects, ZodNumber, ZodString } from "zod";
import { DynamicForm, DynamicFormField } from "@/model/API/form-schema";

type SchemaType= | ZodNumber
  | ZodString
  | ZodEffects<ZodString, string, string>
  | ZodArray<ZodString>
  | ZodEffects<ZodArray<ZodString>, string[], string[]>


const createFieldValidationSchema = (field: DynamicFormField) => {
  let fieldSchema:SchemaType
    = z.string(); // Start with an undefined schema
  switch (field.type) {
    case "text":
      fieldSchema = z.string();
      if (field.validation?.pattern) {
        fieldSchema = fieldSchema.regex(new RegExp(field.validation.pattern), {
          message: `${field.label} is invalid`,
        });
      }
      if (field.validation?.min !== undefined) {
        fieldSchema = fieldSchema.min(field.validation.min, {
          message: `${field.label} should be at least ${field.validation.min}`,
        });
      }
      if (field.validation?.max !== undefined) {
        fieldSchema = fieldSchema.max(field.validation.max, {
          message: `${field.label} should be at most ${field.validation.max}`,
        });
      }
      break;

    case "number":
      fieldSchema = z.number();
      if (field.validation?.min !== undefined) {
        fieldSchema = fieldSchema.min(field.validation.min, {
          message: `${field.label} should be at least ${field.validation.min}`,
        });
      }
      if (field.validation?.max !== undefined) {
        fieldSchema = fieldSchema.max(field.validation.max, {
          message: `${field.label} should be at most ${field.validation.max}`,
        });
      }
      break;

    case "select":
    case "radio":
      fieldSchema = z.string();
      if (field.options && field.options.length > 0) {
        fieldSchema = fieldSchema.refine(
          (value) => field.options?.includes(value),
          {
            message: `${field.label} should be one of the valid options`,
          },
        );
      }
      break;

    case "checkbox":
      fieldSchema = z.array(z.string());
      fieldSchema = fieldSchema.refine((val) => val.length > 0, {
        message: `${field.label} should have at least required`,
      });
      break;

    default:
      break;
  }
  return fieldSchema;
};

const createFormValidationSchema = (fields: DynamicFormField[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "group" && field.fields) {
      // Recursively create validation schema for nested group fields
      shape[field.id] = createFormValidationSchema(field.fields);
    } else {
      shape[field.id] = createFieldValidationSchema(field);
    }
  });

  return z.object(shape); // Return the full schema for the form
};

export const generateValidationSchema = (form: DynamicForm) => {
  return createFormValidationSchema(form.fields);
};
