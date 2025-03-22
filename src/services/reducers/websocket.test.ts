import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ITEMS,
} from "../actions/websocket";
import { initialState, websocket } from "./websocket";

describe("websocket reducer", () => {
  const payload = new Event("error");

  const itemsResponseOrders = [
    {
      name: "",
      ingredients: [""],
      owner: "",
      _id: "",
      status: "",
      number: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  ];

  const itemsResponse = {
    success: true,
    orders: itemsResponseOrders,
    total: 0,
    totalToday: 0,
    message: "",
  };

  it("should return the initial state of websocket", () => {
    expect(websocket(undefined, { type: "" } as never)).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      websocket(undefined, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      websocket(undefined, {
        type: WS_CONNECTION_ERROR,
        payload,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: payload,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      websocket(undefined, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });

  it("should handle WS_GET_ITEMS", () => {
    expect(
      websocket(undefined, {
        type: WS_GET_ITEMS,
        payload: itemsResponse,
      })
    ).toEqual({
      ...initialState,
      items: [itemsResponse],
      error: undefined,
    });
  });
});
