import {DynamicFormResponse, formResponseSchema} from "@/model/API/form-schema";
import {networkClient} from "@/lib/axios";
import {ApiEndpoints} from "@/api-endpoints";

export interface InsuranceFormService {
  getAllSubmittedForms: () => Promise<any[]>;
  submitForm: () => Promise<any[]>;
  getAllAvailableForms: () => Promise<DynamicFormResponse>;
}

export class InsuranceFormServiceImpl implements InsuranceFormService {
  async getAllSubmittedForms() {}

  async submitForm() {}

  async getAllAvailableForms():Promise<DynamicFormResponse> {
    const response=await networkClient.get(ApiEndpoints.getForms);
    return formResponseSchema.parse(response.data);
  }
}

export const insuranceService = new InsuranceFormServiceImpl();
