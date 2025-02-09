import { v4 as uuidv4 } from "uuid";
export const ADD_BURGER_INGREDIENT = "ADD_BURGER_INGREDIENT";
export const ADD_BURGER_BUN = "ADD_BURGER_BUN";
export const DELETE_BURGER_INGREDIENT = "DELETE_BURGER_INGREDIENT";

export const SWAP_BURGER_INGREDIENT = "SWAP_BURGER_INGREDIENT";

export const RESET_BURGER_CONSTRUCTOR = "RESET_BURGER_CONSTRUCTOR";

export const addIngredient = (item) => {
  return {
    type: ADD_BURGER_INGREDIENT,
    payload: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};
