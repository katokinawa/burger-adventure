import { WS_USER_ORDERS_CONNECTION_CLOSED, WS_USER_ORDERS_CONNECTION_ERROR, WS_USER_ORDERS_CONNECTION_SUCCESS, WS_USER_ORDERS_GET_ITEMS } from "../actions/websocketUser";
import { initialState, websocketUser } from "./websocketUser";



describe("websocketUser reducer", () => {
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

  it("should return the initial state of websocketUser", () => {
    expect(websocketUser(undefined, { type: "" } as never)).toEqual(initialState);
  });

  it("should handle WS_USER_ORDERS_CONNECTION_SUCCESS", () => {
    expect(
      websocketUser(undefined, {
        type: WS_USER_ORDERS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });

  it("should handle WS_USER_ORDERS_CONNECTION_ERROR", () => {
    expect(
      websocketUser(undefined, {
        type: WS_USER_ORDERS_CONNECTION_ERROR,
        payload,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: payload,
    });
  });

  it("should handle WS_USER_ORDERS_CONNECTION_CLOSED", () => {
    expect(
      websocketUser(undefined, {
        type: WS_USER_ORDERS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });

  it("should handle WS_USER_ORDERS_GET_ITEMS", () => {
    expect(
      websocketUser(undefined, {
        type: WS_USER_ORDERS_GET_ITEMS,
        payload: itemsResponse,
      })
    ).toEqual({
      ...initialState,
      items: [itemsResponse],
      error: undefined,
    });
  });
});
