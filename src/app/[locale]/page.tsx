import FormFetchContainer from "@/components/insurance-form/form-fetch-container";
import {Suspense} from "react";
import { FormsListSkeleton } from "@/components/insurance-form/form-shimmer";
import { ErrorBoundary } from "@/components/error-boundary";
import { useTranslations } from "next-intl";

export default function InsuranceDashboard() {

  const t=useTranslations("form")
  return (
    <main className="w-full bg-background p-6 pb-12">
      <h2 className="text-2xl font-bold mb-6">{t("forms-list-title")}</h2>

      <ErrorBoundary>
        <Suspense fallback={<FormsListSkeleton/>}>
          <FormFetchContainer/>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
