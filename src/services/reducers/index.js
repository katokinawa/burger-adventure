import { combineReducers } from "redux";
import { burgerConstructor } from "./burger-constructor";
import { ingredientDetail } from "./ingredient-detail";
import { ingredients } from "./ingredients";
import { orderDetail } from "./order-detail";
import { form } from "./form";

export const rootReducer = combineReducers({
  burger_constructor: burgerConstructor,
  ingredient: ingredientDetail,
  ingredients: ingredients,
  order: orderDetail,
  form: form,
});
