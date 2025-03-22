import { IItem } from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  TIngredients,
} from "../actions/ingredients";

type TIngredientsState = {
  items: IItem[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const initialState: TIngredientsState = {
  items: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredients = (state = initialState, action: TIngredients) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
