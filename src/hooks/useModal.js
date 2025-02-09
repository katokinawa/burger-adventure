import { useDispatch } from "react-redux";
import {
  DELETE_SELECTED_INGREDIENT,
  SET_SELECTED_INGREDIENT,
} from "../services/actions/ingredient-detail";
import { ORDER_SET_INITIAL_STATE } from "../services/actions/order-detail";
import { useNavigate } from "react-router-dom";

export const useModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (item, ingredientType) => {
    dispatch({
      type: SET_SELECTED_INGREDIENT,
      item,
      ingredientType,
    });
    switch (ingredientType) {
      case "ingredient": {
        navigate(`/ingredient/${item._id}`, { state: { background: true } });
        break;
      }
      case "postorder": {
        navigate("/order");
        break;
      }
      default:
        navigate("/");
    }
  };

  const closeModal = () => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
    });
    dispatch({
      type: ORDER_SET_INITIAL_STATE,
    });
    navigate(-1);
  };

  return {
    openModal,
    closeModal,
  };
};
