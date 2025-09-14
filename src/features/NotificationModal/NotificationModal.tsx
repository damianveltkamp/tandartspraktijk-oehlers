"use client";
import * as Dialog from "@/components/Dialog/Dialog";
import { useEffect, useState } from "react";

interface NotificationModalProps {
  description: string;
  title: string;
}

/**
 * @component NotificationModal
 * @client
 *
 * NotificationModal contains all logic in order to show important notifications to the user.
 */
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
        <Dialog.Overlay />
        <Dialog.ContentContainer>
          <Dialog.Header closeModal={closeModal} title={title} />
          <Dialog.Content description={description}></Dialog.Content>
        </Dialog.ContentContainer>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
