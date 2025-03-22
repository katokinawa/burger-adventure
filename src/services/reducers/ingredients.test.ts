import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";
import { initialState, ingredients } from "./ingredients";

describe("ingredients reducer", () => {
  const item = {
    _id: "",
    name: "",
    type: "",
    uniqueId: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
    ingredients: [""],
    status: true,
    createdAt: "",
  };

  it("should return the initial state of ingredients", () => {
    expect(ingredients(undefined, { type: "" } as never)).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      ingredients(undefined, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });

  it("should handle GET_INGREDIENTS_ERROR", () => {
    expect(
      ingredients(undefined, {
        type: GET_INGREDIENTS_ERROR,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      ingredients(undefined, {
        type: GET_INGREDIENTS_SUCCESS,
        items: [item],
      })
    ).toEqual({
      ...initialState,
      items: [item],
      ingredientsRequest: false,
    });
  });
});
