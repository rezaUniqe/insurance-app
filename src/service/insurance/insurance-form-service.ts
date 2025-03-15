import {
  DynamicFormResponse,
  formResponseSchema,
} from "@/model/API/form-schema";
import { networkClient } from "@/lib/axios";
import { ApiEndpoints } from "@/api-endpoints";
import {FormSubmitRequestBody} from "@/model/API/form-submit-request-body";

export interface InsuranceFormService {
  getAllSubmittedForms: () => Promise<any[]>;
  submitForm: (formInfo:FormSubmitRequestBody) => Promise<void>;
  getAllAvailableForms: () => Promise<DynamicFormResponse>;
}

export class InsuranceFormServiceImpl implements InsuranceFormService {
  async getAllSubmittedForms() {}

  async submitForm(formInfo:FormSubmitRequestBody) {
    await networkClient.post(ApiEndpoints.submitForm,formInfo);
  }

  async getAllAvailableForms(): Promise<DynamicFormResponse> {
    const response = await networkClient.get(ApiEndpoints.getForms);
    return formResponseSchema.parse(response.data);
  }
}

export const insuranceService = new InsuranceFormServiceImpl();
