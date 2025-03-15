import FormSubmissionContainer from "@/app/[locale]/form-submissions/_components/form-submission-container";
import { ErrorBoundary } from "@/components/error-boundary";
import { Suspense } from "react";
import {useTranslations} from "next-intl";

export default function Submissions() {
 const t=useTranslations("applications-table")
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <ErrorBoundary>
        <Suspense fallback={"loading....."}>
          <FormSubmissionContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
