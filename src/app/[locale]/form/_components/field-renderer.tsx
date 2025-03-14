"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DynamicFormField, SelectFormField } from "@/model/API/form-schema";
import { useFetchSelectQueryOptions } from "@/app/[locale]/form/_hooks/use-fetch-select-query-options";

type FieldRendererProps = {
  field: DynamicFormField;
};

function SelectField(field: SelectFormField) {
  const form = useFormContext();
  const dependentValue = useWatch({
    control: form.control,
    name: field.dynamicOptions?.dependsOn as string,
  });
  const { data } = useFetchSelectQueryOptions({
    variables:field?.dynamicOptions? {...field.dynamicOptions,dependentValue: dependentValue}:undefined,
    enabled: !!field.dynamicOptions && !!dependentValue,
  });
  const options = field.dynamicOptions ? data : field.options;
  return (
    <FormField
      control={form.control}
      name={field.id}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Select
            onValueChange={formField.onChange}
            defaultValue={formField.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FieldRenderer({ field }: FieldRendererProps) {
  const [isVisible, setIsVisible] = useState(true);
  const form = useFormContext();

  const hasVisibilityField =
    (field.type === "radio" || field.type === "select") &&
    Object.hasOwn(field, "visibility");

  const dependentFormName = hasVisibilityField
    ? field.visibility?.dependsOn
    : "";
  const dependentValue = useWatch({
    control: form.control,
    name: dependentFormName as string,
  });

  useEffect(() => {
    if (hasVisibilityField) {
      const { condition, value } = field.visibility!;
      setIsVisible(condition === "equals" ? dependentValue === value : true);
    }
  }, [dependentValue, field, hasVisibilityField]);

  if (!isVisible) {
    return null;
  }

  switch (field.type) {
    case "text":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              <FormControl>
                <Input {...formField} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "number":
      return (
        <FormField
          name={field.id}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...formField}
                  onChange={(e) =>
                    formField.onChange(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "date":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              <FormControl>
                <Input type="date" {...formField} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "select":
      return <SelectField {...field} />;

    case "radio":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: formField }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                  className="flex flex-col space-y-1"
                >
                  {field.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`${field.id}-${option}`}
                      />
                      <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "checkbox":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={() => (
            <FormItem>
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              {field.options.map((option) => (
                <FormField
                  key={option}
                  control={form.control}
                  name={field.id}
                  render={({ field: formField }) => (
                    <FormItem
                      key={option}
                      className="flex flex-row items-start space-x-3 space-y-0 mb-1"
                    >
                      <FormControl>
                        <Checkbox
                          checked={formField.value?.includes(option)}
                          onCheckedChange={(checked) =>
                            formField.onChange(
                              checked
                                ? [...(formField.value || []), option]
                                : (formField.value || []).filter(
                                    (v: string) => v !== option,
                                  ),
                            )
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "group":
      return (
        <div className="space-y-4 border p-4 rounded-md">
          <h3 className="font-medium text-lg">{field.label}</h3>
          <div className="space-y-4">
            {field.fields?.map((nestedField) => (
              <FieldRenderer key={nestedField.id} field={nestedField} />
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
