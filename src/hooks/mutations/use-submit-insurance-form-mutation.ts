import {createMutation} from "react-query-kit";
import {insuranceService} from "@/service/insurance/insurance-form-service";

export const useSubmitInsuranceFormMutation = createMutation({
  mutationKey:["submitInsuranceForm"],
  mutationFn:async ()=>{
    await insuranceService.submitForm()
  }
})