import FormFetchContainer from "@/components/insurance-form/form-fetch-container";
import { Suspense } from "react";
import { FormsLoading } from "@/components/insurance-form/form-shimmer";
import { ErrorBoundary } from "@/components/error-boundary";

export default function InsuranceDashboard() {
  return (
      <main className="w-full bg-background p-6">
        <ErrorBoundary>
          <Suspense fallback={<FormsLoading />}>
            <FormFetchContainer />
          </Suspense>
        </ErrorBoundary>
      </main>
  );
}
