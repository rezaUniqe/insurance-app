import FormsList from "@/components/insurance-form/forms-list";
import { insuranceService } from "@/service/insurance/insurance-form-service";

async function FormFetchContainer() {
  const forms = await insuranceService.getAllAvailableForms();

  return <FormsList forms={forms} />;
}

export default FormFetchContainer;
