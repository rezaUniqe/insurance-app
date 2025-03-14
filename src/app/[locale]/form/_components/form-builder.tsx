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
import { FieldRenderer } from "@/app/[locale]/form/_components/field-renderer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { generateValidationSchema } from "@/model/API/form-validation-schema";
import { useSubmitInsuranceFormMutation } from "@/hooks/mutations/use-submit-insurance-form-mutation";

type FormBuilderProps = {
  form: DynamicForm;
};

export function FormBuilder({ form }: FormBuilderProps) {
  const [isSubmitting] = useState(false);

  const validationSchema = generateValidationSchema(form);
  const formMethods = useForm({
    resolver: zodResolver(validationSchema), // Pass the dynamic schema to zodResolver
  });

  const { mutate } = useSubmitInsuranceFormMutation();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
      </CardHeader>
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(
            () => {
              mutate();
            },
            (e) => {
              console.log(e);
            },
          )}
        >
          <CardContent className="space-y-6">
            {form.fields.map((field) => (
              <FieldRenderer key={field.id} field={field} />
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
