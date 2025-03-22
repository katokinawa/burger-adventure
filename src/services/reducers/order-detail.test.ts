import {
  ORDER_SET_INITIAL_STATE,
  POST_ORDER_ERROR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../actions/order-detail";
import { initialState, orderDetail } from "./order-detail";

describe("ingredientDetail order-detail", () => {
  const orderDetailValues = {
    name: "",
    order: { number: 0 },
    success: true,
  };
  it("should return the initial state of ingredients", () => {
    expect(orderDetail(undefined, { type: "" } as never)).toEqual(initialState);
  });

  it("should handle POST_ORDER_REQUEST", () => {
    expect(
      orderDetail(undefined, {
        type: POST_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it("should handle POST_ORDER_SUCCESS", () => {
    expect(
      orderDetail(undefined, {
        type: POST_ORDER_SUCCESS,
        item: orderDetailValues,
      })
    ).toEqual({
      ...initialState,
      data: orderDetailValues,
      orderRequest: false,
      orderFailed: false,
    });
  });

  it("should handle POST_ORDER_ERROR", () => {
    expect(
      orderDetail(undefined, {
        type: POST_ORDER_ERROR,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
    });
  });

  it("should handle ORDER_SET_INITIAL_STATE", () => {
    expect(
      orderDetail(undefined, {
        type: ORDER_SET_INITIAL_STATE,
      })
    ).toEqual({
      ...initialState,
      data: {},
    });
  });
});
