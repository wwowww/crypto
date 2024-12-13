"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useModalStore } from "@/stores/useModalStore";

const Modal = () => {
  const { open, config, closeModal } = useModalStore();

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config?.title || "확인"}</DialogTitle>
          {config?.description && <DialogDescription>{config.description}</DialogDescription>}
        </DialogHeader>
        {config?.content}
        <div className="mt-4 flex justify-end gap-2">
          {config?.footer}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
