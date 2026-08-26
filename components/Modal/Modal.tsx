'use client';

import { useEffect } from "react";
import css from "./Modal.module.css"
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: ()=> void;
};

const Modal = ({ children, onClose }: Props) => {

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
      </div>
    </div>, document.body
  );
};

export default Modal;
