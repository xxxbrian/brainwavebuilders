import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ChangePasswordDialog: React.FC<DialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
          <Dialog.Title className="text-xl font-bold">
            Your password has been changed successfully
          </Dialog.Title>
          <div className="mt-4 flex justify-end">
            <Dialog.Close className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
