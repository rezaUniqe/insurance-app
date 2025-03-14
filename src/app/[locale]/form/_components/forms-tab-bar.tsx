"use client";


import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FormBuilder} from "@/app/[locale]/form/_components/form-builder";
import {useState} from "react";
import {DynamicForm} from "@/model/API/form-schema";


interface Props {
  forms: DynamicForm[];
}

const FormsTabBar = ({forms}:Props) => {
  const [activeTab, setActiveTab] = useState(forms[0]?.formId || "");

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${forms.length}, 1fr)` }}>
        {forms.map((form) => (
          <TabsTrigger key={form.formId} value={form.formId}>
            {form.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {forms.map((form) => (
        <TabsContent key={form.formId} value={form.formId} className="mt-4">
          <FormBuilder form={form} />
        </TabsContent>
      ))}
    </Tabs>

  );
};

export default FormsTabBar;