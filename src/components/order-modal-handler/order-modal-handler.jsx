import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import OrderDetails from "../order-details/order-details";

export default function OrderModalHandler() {
  const { closeModal } = useModal();
  const { isModalOpen } = useSelector((state) => state.ingredient);

  return (
    <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
      <OrderDetails />
    </Modal>
  );
}
