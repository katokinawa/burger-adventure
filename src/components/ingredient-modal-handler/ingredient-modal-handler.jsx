import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function IngredientModalHandler() {
  const { closeModal } = useModal();
  const { isModalOpen } = useSelector((state) => state.ingredient);
  const location = useLocation();
  const isModal = location.state?.background; 
  console.log(location)

  if (isModalOpen || isModal) {
    return (
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <IngredientDetails />
      </Modal>
    );
  }
  return <IngredientDetails />;
}
