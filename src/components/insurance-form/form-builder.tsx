"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { DynamicForm } from "@/model/API/form-schema";
import { FieldRenderer } from "@/components/insurance-form/field-renderer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {createDefaultValues, generateValidationSchema} from "@/model/API/form-validation-schema";
import { useSubmitInsuranceFormMutation } from "@/hooks/mutations/use-submit-insurance-form-mutation";

type FormBuilderProps = {
  form: DynamicForm;
};

export function FormBuilder({ form }: FormBuilderProps) {
  const [isSubmitting] = useState(false);

  const validationSchema = generateValidationSchema(form);

  console.log(createDefaultValues(form.fields))
  const formMethods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { mutate } = useSubmitInsuranceFormMutation();
  return (
      <Form {...formMethods}>
        <form
          className={"flex flex-col gap-6 px-4 pb-4 overflow-y-auto"}
          onSubmit={formMethods.handleSubmit(
            () => {
              mutate();
            },
            (e) => {
              console.log(e);
            },
          )}
        >
            {form.fields.map((field) => (
              <FieldRenderer key={field.id} field={field} />
            ))}
            <Button className={"w-full"} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
      </Form>
  );
}
