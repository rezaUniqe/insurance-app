import FormFetchContainer from "@/components/insurance-form/form-fetch-container";
import { Suspense } from "react";
import { FormsListSkeleton } from "@/components/insurance-form/form-shimmer";
import { ErrorBoundary } from "@/components/error-boundary";

export default function InsuranceDashboard() {
  return (
    <main className="w-full bg-background p-6 pb-12">
      <h2 className="text-2xl font-bold mb-6">Insurance Coverage</h2>

      <ErrorBoundary>
        <Suspense fallback={<FormsListSkeleton/>}>
          <FormFetchContainer/>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
