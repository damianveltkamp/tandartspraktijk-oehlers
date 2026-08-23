"use client";
import * as Dialog from "@/components/Dialog/Dialog";
import { useSyncExternalStore } from "react";
import type { NotificationModalProps } from "./NotificationModal.types";

const STORAGE_KEY = "modalShown";
// sessionStorage fires no event in the tab that writes to it, so closing the
// modal has to nudge `useSyncExternalStore` by hand.
const CHANGE_EVENT = "notification-modal-dismissed";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
};

const getSnapshot = () => sessionStorage.getItem(STORAGE_KEY) !== null;
// The server cannot know whether this visitor already dismissed the modal.
// Rendering it as dismissed keeps the markup stable through hydration; React
// then re-reads the real value on the client.
const getServerSnapshot = () => true;

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
  // TODO: Figure out how to clear the modalShown from sessionStorage when the content of the modal
  // has changed while the user is still in the current tab.
  const isDismissed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const closeModal = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <Dialog.Root open={!isDismissed}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.ContentContainer className="max-w-[650px]">
          <Dialog.Header closeModal={closeModal} title={title} />
          <Dialog.Content description={description}></Dialog.Content>
        </Dialog.ContentContainer>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
