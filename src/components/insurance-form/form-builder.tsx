"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DynamicForm } from "@/model/API/form-schema";
import { FieldRenderer } from "@/components/insurance-form/field-renderer";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateValidationSchema } from "@/model/API/form-validation-schema";
import { useSubmitInsuranceFormMutation } from "@/hooks/mutations/use-submit-insurance-form-mutation";

type FormBuilderProps = {
  form: DynamicForm;
  onFormSubmitted: () => void;
};

export function FormBuilder({ form, onFormSubmitted }: FormBuilderProps) {

  const validationSchema = generateValidationSchema(form);

  const formMethods = useForm({
    resolver: zodResolver(validationSchema),
  });
  const { mutate ,isPending} = useSubmitInsuranceFormMutation({
    onSuccess: onFormSubmitted,
    onError:()=>{

    }
  });
  return (
    <Form {...formMethods}>
      <form
        className={"flex flex-col gap-6 px-4 pb-4 overflow-y-auto"}
        onSubmit={formMethods.handleSubmit((data) => {
          mutate({
            variables: data,
          });
        })}
      >
        {form.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} />
        ))}
        <Button className={"w-full"} type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
