import * as RadixDialog from "@radix-ui/react-dialog";
import { CircleX } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Root = ({ children, open, ...props }: RadixDialog.DialogProps) => {
  return (
    <RadixDialog.Root open={open} {...props}>
      {children}
    </RadixDialog.Root>
  );
};

const Portal = ({ children, ...props }: RadixDialog.DialogPortalProps) => {
  return <RadixDialog.Portal {...props}>{children}</RadixDialog.Portal>;
};

const Overlay = ({ className, ...props }: RadixDialog.DialogOverlayProps) => {
  return (
    <RadixDialog.Overlay
      className={twMerge(
        "bg-overlay animate-radixDialogOverlayShow fixed inset-0 z-50",
        className,
      )}
      {...props}
    />
  );
};

const ContentContainer = ({
  children,
  className,
  ...props
}: RadixDialog.DialogContentProps) => {
  return (
    <RadixDialog.Content
      className={twMerge(
        "animate-radixDialogContentShow fixed top-1/2 left-1/2 z-50 w-[calc(100%-40px)] max-w-[650px] -translate-x-1/2 -translate-y-1/2",
        className,
      )}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  );
};

interface ContentProps extends RadixDialog.DialogContentProps {
  description?: string;
}

const Content = ({ children, description, className }: ContentProps) => {
  return (
    <div
      className={twMerge(
        "rounded-b-8 overflow-y-auto bg-white p-20",
        className,
      )}
    >
      <div>
        {description && (
          <RadixDialog.Description>{description}</RadixDialog.Description>
        )}
        {children}
      </div>
    </div>
  );
};

interface HeaderProps {
  className?: string;
  closeModal: VoidFunction;
  title: string;
}

const Header = ({ title, closeModal, className }: HeaderProps) => {
  return (
    <div
      className={twMerge(
        "rounded-t-8 bg-primary flex justify-between gap-40 p-20",
        className,
      )}
    >
      <RadixDialog.Title className="typography-headline-2">
        {title}
      </RadixDialog.Title>
      <button
        className="h-fit hover:cursor-pointer"
        aria-label="Close"
        onClick={closeModal}
      >
        <CircleX />
      </button>
    </div>
  );
};
export { Content, ContentContainer, Header, Overlay, Portal, Root };
