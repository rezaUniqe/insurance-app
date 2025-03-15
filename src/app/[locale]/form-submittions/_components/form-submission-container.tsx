"use client"


import {useFormSubmissionQuery} from "@/hooks/queries/use-form-submission-query";
import {FormSubmissionTable} from "@/app/[locale]/form-submittions/_components/form-submission-table";

const FormSubmissionContainer =  () => {
 const {data}=useFormSubmissionQuery()
  return (
    <FormSubmissionTable data={data} />
  );
};

export default FormSubmissionContainer;