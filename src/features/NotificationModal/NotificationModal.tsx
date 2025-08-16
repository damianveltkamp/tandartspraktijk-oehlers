"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationModalProps {
  description: string;
  title: string;
}

export const NotificationModal = ({
  title,
  description,
}: NotificationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("modalShown", "true");
  };

  useEffect(() => {
    // TODO: Figure out how to clear the modalShown from sessionStorage when the content of the modal
    // has changed while the user is still in the current tab.
    const modalShown = sessionStorage.getItem("modalShown");
    setIsOpen(!modalShown);
  }, []);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-overlay animate-radixDialogOverlayShow fixed inset-0 z-50" />
        <Dialog.Content className="animate-radixDialogContentShow fixed top-1/2 left-1/2 z-50 w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-t-8 bg-primary flex justify-between gap-40 p-20">
            <Dialog.Title className="typography-headline-2">
              {title}
            </Dialog.Title>
            <button
              className="h-fit hover:cursor-pointer"
              aria-label="Close"
              onClick={closeModal}
            >
              <CircleX />
            </button>
          </div>
          <div className="rounded-b-8 bg-white p-20">
            <Dialog.Description>{description}</Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
