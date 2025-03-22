import { IItem } from "../../utils/types";
import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  SWAP_BURGER_INGREDIENT,
  ADD_BURGER_BUN,
  RESET_BURGER_CONSTRUCTOR,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";

type TBurgerConstructorState = {
  items: IItem[];
  buns: IItem[];
};

export const initialState: TBurgerConstructorState = {
  items: [],
  buns: [],
};

export const burgerConstructor = (state = initialState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_BURGER_BUN: {
      return {
        ...state,
        buns: [action.item],
      };
    }
    case SWAP_BURGER_INGREDIENT: {
      return {
        ...state,
        items: action.item,
      };
    }
    case ADD_BURGER_INGREDIENT: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        items: action.item,
      };
    }
    case RESET_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        items: [],
        buns: [],
      };
    }
    default: {
      return state;
    }
  }
};
