import {
  DynamicFormResponse,
  formResponseSchema,
} from "@/model/API/form-schema";
import { networkClient } from "@/lib/axios";
import { ApiEndpoints } from "@/api-endpoints";
import { FormSubmitRequestBody } from "@/model/API/form-submit-request-body";
import {FormSubmissionResponse, formSubmissionResponseSchema} from "@/model/API/form-submission-schema";

export interface InsuranceFormService {
  getAllSubmittedForms: () => Promise<FormSubmissionResponse>;
  submitForm: (formInfo: FormSubmitRequestBody) => Promise<void>;
  getAllAvailableForms: () => Promise<DynamicFormResponse>;
}

export class InsuranceFormServiceImpl implements InsuranceFormService {
  async getAllSubmittedForms() {
    const response = await networkClient.get(ApiEndpoints.getSubmittedForms);
    return formSubmissionResponseSchema.parse(response.data);
  }

  async submitForm(formInfo: FormSubmitRequestBody) {
    await networkClient.post(ApiEndpoints.submitForm, formInfo);
  }

  async getAllAvailableForms(): Promise<DynamicFormResponse> {
    const response = await networkClient.get(ApiEndpoints.getForms);
    return formResponseSchema.parse(response.data);
  }
}

export const insuranceService = new InsuranceFormServiceImpl();
