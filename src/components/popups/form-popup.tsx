"use client";

import {ReactNode, Suspense, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormFetchContainer from "@/app/[locale]/form/_components/form-fetch-container";

type FormPopupProps = {
  trigger?: ReactNode;
  children?: ReactNode;
};

export function FormPopup({ trigger,children }: FormPopupProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open Insurance Forms</Button>}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Insurance Applications</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
