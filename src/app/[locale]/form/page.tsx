import {Suspense} from 'react';
import {FormPopup} from "@/components/popups/form-popup";
import { Button } from "@/components/ui/button";
import FormFetchContainer from "@/app/[locale]/form/_components/form-fetch-container";




const Page = () => {

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Insurance Application Forms</h1>
      <div className="flex flex-col items-center justify-center">
        <p className="text-center mb-6 max-w-2xl">
          Complete your insurance applications easily using our online forms. Click the button below to get started with
          health, home, or car insurance.
        </p>

        <FormPopup
          trigger={
            <Button size="lg" className="px-8">
              Start Application
            </Button>
          }
        >
          <Suspense fallback={"loading..."}>
            <FormFetchContainer />
          </Suspense>
        </FormPopup>
      </div>
    </main>
  );
};

export default Page;