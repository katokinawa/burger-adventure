import { TModal } from "../../utils/types";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ handleClose, children }: TModal) {
  return (
    <div onClick={handleClose} className={styles.modal_overlay} data-testid="open-modal-overlay">
      {children}
    </div>
  );
}
