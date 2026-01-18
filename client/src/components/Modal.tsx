import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button.js";

type ModalHandle = {
  open: () => void;
};

type ModalProps = {
  children: ReactNode;
  buttonCaption: string;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children, buttonCaption },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <dialog ref={dialog}>
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    modalRoot,
  );
});

export default Modal;
