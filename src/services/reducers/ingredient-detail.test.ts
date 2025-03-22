import {
  CLEAR_INGREDIENT_DATA,
  DELETE_SELECTED_INGREDIENT,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  SET_SELECTED_INGREDIENT,
} from "../actions/ingredient-detail";
import { initialState, ingredientDetail } from "./ingredient-detail";

describe("ingredientDetail reducer", () => {
  const ingredientType = "";
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

  const itemsResponseOrders = {
    name: "",
    ingredients: [""],
    owner: "",
    _id: "",
    status: "",
    number: 0,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  };

  it("should return the initial state of ingredient detail", () => {
    expect(ingredientDetail(undefined, { type: "" } as never)).toEqual(
      initialState
    );
  });

  it("should handle SET_SELECTED_INGREDIENT", () => {
    expect(
      ingredientDetail(undefined, {
        type: SET_SELECTED_INGREDIENT,
        item,
        ingredientType,
      })
    ).toEqual({
      ...initialState,
      data: item,
      isModalOpen: true,
      ingredientType: ingredientType,
    });
  });

  it("should handle SET_SELECTED_INGREDIENT_ITEMS_RESPONSE_ORDERS", () => {
    expect(
      ingredientDetail(undefined, {
        type: SET_SELECTED_INGREDIENT,
        item: itemsResponseOrders,
        ingredientType,
      })
    ).toEqual({
      ...initialState,
      data: itemsResponseOrders,
      isModalOpen: true,
      ingredientType: ingredientType,
    });
  });

  it("should handle SET_SELECTED_INGREDIENT_ITEMS_RESPONSE_EMPTY", () => {
    expect(
      ingredientDetail(undefined, {
        type: SET_SELECTED_INGREDIENT,
        item: {},
        ingredientType,
      })
    ).toEqual({
      ...initialState,
      data: {},
      isModalOpen: true,
      ingredientType: ingredientType,
    });
  });

  it("should handle DELETE_SELECTED_INGREDIENT", () => {
    expect(
      ingredientDetail(undefined, {
        type: DELETE_SELECTED_INGREDIENT,
      })
    ).toEqual({
      ...initialState,
      isModalOpen: false,
      ingredientType: "",
    });
  });

  it("should handle CLEAR_INGREDIENT_DATA", () => {
    expect(
      ingredientDetail(undefined, {
        type: CLEAR_INGREDIENT_DATA,
      })
    ).toEqual({
      ...initialState,
      data: {},
    });
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      ingredientDetail(undefined, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      OrderRequest: true,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      ingredientDetail(undefined, {
        type: GET_ORDER_SUCCESS,
        payload: itemsResponseOrders,
      })
    ).toEqual({
      ...initialState,
      data: itemsResponseOrders,
      OrderRequest: false,
    });
  });

  it("should handle GET_ORDER_ERROR", () => {
    expect(
      ingredientDetail(undefined, {
        type: GET_ORDER_ERROR,
      })
    ).toEqual({
      ...initialState,
      OrderRequest: false,
      OrderFailed: true,
    });
  });
});
