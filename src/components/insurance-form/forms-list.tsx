"use client"

import { useState } from "react"
import type { DynamicForm } from "@/model/API/form-schema"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import {FormModal} from "@/components/popups/form-popup";

interface Props {
  forms: DynamicForm[]
}

const FormsList = ({ forms }: Props) => {
  const [selectedForm, setSelectedForm] = useState<DynamicForm | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenForm = (form: DynamicForm) => {
    setSelectedForm(form)
    setIsModalOpen(true)
  }

  const handleCloseForm = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedForm(null), 300)
  }

  return (
    <>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Insurance Coverage</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <Card key={form.formId} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between group" onClick={() => handleOpenForm(form)}>
                  Fill form
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <FormModal form={selectedForm} isOpen={isModalOpen} onClose={handleCloseForm} />
    </>
  )
}

export default FormsList

