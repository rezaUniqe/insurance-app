import { createSuspenseQuery} from "react-query-kit";
import {insuranceService} from "@/service/insurance/insurance-form-service";

export const useFormSubmissionQuery = createSuspenseQuery({
  queryKey:["form-submission-query"],
  fetcher:async ()=>{
    return await insuranceService.getAllSubmittedForms()
  }
})