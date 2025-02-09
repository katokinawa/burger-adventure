import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
} from "../actions/ingredient-detail";

const initialState = {
  data: {},
  isModalOpen: false,
  ingredientType: "",
};

export const ingredientDetail = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: action.item,
        isModalOpen: true,
        ingredientType: action.ingredientType,
      };
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: {},
        isModalOpen: false,
        ingredientType: null,
      };
    }
    default: {
      return state;
    }
  }
};
