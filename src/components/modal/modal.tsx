import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import closeImage from "../../images/close.svg";
import { AnimatePresence, motion } from "motion/react";
import { TModal } from "../../utils/types";

export default function Modal({ handleClose, children }: TModal) {
  useEffect(() => {
    function handlePressKey(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", handlePressKey);
    return () => document.removeEventListener("keydown", handlePressKey);
  }, [handleClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalOverlay handleClose={handleClose}>
          <div
            onClick={(evt) => evt.stopPropagation()}
            className={styles.modal}
            data-testid="modal-window"
          >
            <button className={styles.modal_close_button} onClick={handleClose}>
              <img src={closeImage} alt="Крестик" data-testid="close-button" />
            </button>
            {children}
          </div>
        </ModalOverlay>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal")!
  );
}
