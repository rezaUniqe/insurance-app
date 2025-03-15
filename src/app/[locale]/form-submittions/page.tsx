import FormSubmissionContainer from "@/app/[locale]/form-submittions/_components/form-submission-container";
import { ErrorBoundary } from "@/components/error-boundary";
import { Suspense } from "react";

export default function Submissions() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <ErrorBoundary>
        <Suspense fallback={"loading....."}>
          <FormSubmissionContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
