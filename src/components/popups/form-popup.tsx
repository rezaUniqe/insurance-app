"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FormBuilder } from "@/components/insurance-form/form-builder";
import type { DynamicForm } from "@/model/API/form-schema";
import {useIsMobile} from "@/hooks/use-is-mobile";

interface FormModalProps {
  form: DynamicForm | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FormModal({ form, isOpen, onClose }: FormModalProps) {
 const isMobile=useIsMobile()
  if (!form) return null;

  return (
    <>
      {isMobile && <div className="md:hidden">
        <Drawer open={isMobile?isOpen:undefined} onOpenChange={isMobile?onClose:undefined}>
          <DrawerContent  onInteractOutside={
            (e)=>e.preventDefault()
          } className="md:hidden max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>{form.title}</DrawerTitle>
            </DrawerHeader>
              <FormBuilder form={form} />
          </DrawerContent>
        </Drawer>
      </div>
      }

      {!isMobile &&<div className="hidden md:block">
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent onInteractOutside={
            (e)=>e.preventDefault()
          } className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{form.title}</DialogTitle>
            </DialogHeader>
            <FormBuilder form={form} />
          </DialogContent>
        </Dialog>
      </div>}
    </>
  );
}
