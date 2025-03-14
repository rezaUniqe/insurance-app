import FormsTabBar from "@/app/[locale]/form/forms-tab-bar";
import { insuranceService } from "@/service/insurance/insurance-form-service";

async function FormFetchContainer() {
  const forms = await insuranceService.getAllAvailableForms();

  return <FormsTabBar forms={forms} />;
}

export default FormFetchContainer;
