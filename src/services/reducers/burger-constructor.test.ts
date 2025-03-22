import { initialState, burgerConstructor } from "./burger-constructor";
import {
  ADD_BURGER_BUN,
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  RESET_BURGER_CONSTRUCTOR,
  SWAP_BURGER_INGREDIENT,
} from "../actions/burger-constructor";

describe("burgerConstructor reducer", () => {
  const item = {
    _id: "",
    name: "",
    type: "",
    uniqueId: "",
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 1,
    number: 1,
    ingredients: [""],
    status: true,
    createdAt: "",
  };

  it("should return the initial state of burger constructor", () => {
    expect(burgerConstructor(undefined, { type: "" } as never)).toEqual(
      initialState
    );
  });

  it("should handle ADD_BURGER_BUN", () => {
    expect(
      burgerConstructor(undefined, {
        type: ADD_BURGER_BUN,
        item,
      })
    ).toEqual({ ...initialState, buns: [item] });
  });

  it("should handle SWAP_BURGER_INGREDIENT", () => {
    expect(
      burgerConstructor(undefined, {
        type: SWAP_BURGER_INGREDIENT,
        item: [item],
      })
    ).toEqual({ ...initialState, items: [item] });
  });

  it("should handle ADD_BURGER_INGREDIENT", () => {
    expect(
      burgerConstructor(undefined, {
        type: ADD_BURGER_INGREDIENT,
        payload: item,
      })
    ).toEqual({ ...initialState, items: [item] });
  });

  it("should handle DELETE_BURGER_INGREDIENT", () => {
    expect(
      burgerConstructor(undefined, {
        type: DELETE_BURGER_INGREDIENT,
        item: [item],
      })
    ).toEqual({ ...initialState, items: [item] });
  });

  it("should handle RESET_BURGER_CONSTRUCTOR", () => {
    expect(
      burgerConstructor(undefined, {
        type: RESET_BURGER_CONSTRUCTOR,
      })
    ).toEqual(initialState);
  });
});
