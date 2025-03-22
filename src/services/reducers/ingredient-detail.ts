import { IId, IItem, IItemsResponseOrders } from "../../utils/types";
import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAR_INGREDIENT_DATA,
  TIngredientDetailActions,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
} from "../actions/ingredient-detail";

type initialData = {
  number?: number;
  ingredients?: string[];
  status?: boolean;
  createdAt?: string | undefined;
  name?: string;
}

type TIngredientDetailState = {
  data: IItem | IItemsResponseOrders | IId | initialData;
  isModalOpen: boolean;
  ingredientType: string;
  OrderRequest: boolean;
  OrderFailed: boolean;
  OrderMessage: string;
};

export const initialState: TIngredientDetailState = {
  data: {},
  isModalOpen: false,
  ingredientType: "",
  OrderRequest: false,
  OrderFailed: false,
  OrderMessage: "",
};

export const ingredientDetail = (
  state = initialState,
  action: TIngredientDetailActions
) => {
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
        isModalOpen: false,
        ingredientType: "",
      };
    }
    case CLEAR_INGREDIENT_DATA: {
      return {
        ...state,
        data: {},
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        OrderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        OrderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        OrderRequest: false,
        OrderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
