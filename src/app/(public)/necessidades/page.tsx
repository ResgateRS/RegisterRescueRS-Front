"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import NeedsForm from "./form";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDialog = create<DialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export function DialogComponent({data, title}: {data: React.ReactNode, title?: string}) {
  const { isOpen, onClose } = useDialog();
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? ''}</DialogTitle>
          <DialogDescription>
            {data}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default function NeedsPage() {
  const { onOpen } = useDialog();
  return (
    <>
      <Button onClick={() => onOpen()}>clicar aqui</Button>
      <DialogComponent data={<NeedsForm/>}/>
    </>
  );
}
