import {z, ZodNumber, ZodString, ZodType} from "zod";
import { DynamicForm, DynamicFormField } from "@/model/API/form-schema";

const createFieldValidationSchema = (field: DynamicFormField) => {
  let fieldSchema :unknown=z.string()
  switch (field.type) {
    case "text":
      fieldSchema = z.string();
      if (field.validation?.pattern) {
        fieldSchema = (fieldSchema as ZodString).regex(new RegExp(field.validation.pattern), {
          message: `${field.label} is invalid`,
        });
      }
      if (field.validation?.min !== undefined) {
        fieldSchema = (fieldSchema as ZodString).min(field.validation.min, {
          message: `${field.label} should be at least ${field.validation.min}`,
        });
      }
      if (field.validation?.max !== undefined) {
        fieldSchema = (fieldSchema as ZodString).max(field.validation.max, {
          message: `${field.label} should be at most ${field.validation.max}`,
        });
      }
      if (field.required) {
        fieldSchema = (fieldSchema as ZodString).refine((e) => !!e, {
          message: `${field.label} required}`,
        })
      }
      break;

    case "number":
      fieldSchema = z.number();
      if (field.validation?.min !== undefined) {
        fieldSchema = (fieldSchema as ZodNumber).min(field.validation.min, {
          message: `${field.label} should be at least ${field.validation.min}`,
        });
      }
      if (field.validation?.max !== undefined) {
        fieldSchema = (fieldSchema as ZodNumber).max(field.validation.max, {
          message: `${field.label} should be at most ${field.validation.max}`,
        });
      }
      if (field.required) {
        fieldSchema = (fieldSchema as ZodString).refine((e) => e !== "", {
          message: `${field.label} required}`,
        }) as unknown as ZodNumber;
      }
      break;

    case "select":
    case "radio":
      fieldSchema = z.string();
      if (field.options && field.options.length > 0) {
        fieldSchema = (fieldSchema as ZodString).refine(
          (value) => field.options?.includes(value),
          {
            message: `${field.label} should be one of the valid options`,
          },
        );
      }
      if (field.required) {
        fieldSchema = (fieldSchema as ZodString).refine((e) => !!e, {
          message: `${field.label} required}`,
        });
      }
      break;

    case "checkbox":
      fieldSchema = z.array(z.string());
      fieldSchema = (fieldSchema as ZodString).refine((val) => val.length > 0, {
        message: `${field.label} should have at least required`,
      });
      if (field.required) {
        fieldSchema = (fieldSchema as ZodString).refine((e) => e !== undefined, {
          message: `${field.label} required}`,
        });
      }
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
      shape[field.id] = createFormValidationSchema(field.fields);
    } else {
      shape[field.id] = createFieldValidationSchema(field) as ZodType;
    }
  });

  return z.object(shape);
};

export const generateValidationSchema = (form: DynamicForm) => {
  return createFormValidationSchema(form.fields);
};
