import Link from "next/link";
import { FormInput, Home, Phone, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/toggle-theme";
import FormFetchContainer from "@/components/insurance-form/form-fetch-container";
import { Suspense } from "react";
import { FormsLoading } from "@/components/insurance-form/form-shimmer";
import { ErrorBoundary } from "@/components/error-boundary";

export default function InsuranceDashboard() {
  return (
    <div className="flex min-h-screen flex-col px-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>InsureShield</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Policies
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t flex justify-around items-center">
        <Link href="#" className="flex flex-col items-center text-xs">
          <Home className="h-5 w-5 mb-1" />
          <span>Home</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-xs">
          <FormInput className="h-5 w-5 mb-1" />
          <span>forms</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-xs">
          <Phone className="h-5 w-5 mb-1" />
          <span>Submissions</span>
        </Link>
        <div className="flex flex-col items-center text-xs">
          <ThemeToggle />
          <span className="mt-1">Theme</span>
        </div>
      </div>

      <main className="flex-1 container py-6 md:py-10 pb-20 md:pb-10">
        <ErrorBoundary>
          <Suspense fallback={<FormsLoading />}>
            <FormFetchContainer />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
