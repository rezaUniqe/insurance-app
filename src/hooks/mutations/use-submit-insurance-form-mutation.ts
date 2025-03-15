import { createMutation } from "react-query-kit";
import { insuranceService } from "@/service/insurance/insurance-form-service";
import { FormSubmitRequestBody } from "@/model/API/form-submit-request-body";

export const useSubmitInsuranceFormMutation = createMutation<
  void,
  FormSubmitRequestBody
>({
  mutationKey: ["submitInsuranceForm"],
  mutationFn: async (variables) => {
    await insuranceService.submitForm(variables);
  },
});
