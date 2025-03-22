import { IItemsResponse } from "../../utils/types";
import { TWebsocketUser, WS_USER_ORDERS_CONNECTION_CLOSED, WS_USER_ORDERS_CONNECTION_ERROR, WS_USER_ORDERS_CONNECTION_SUCCESS, WS_USER_ORDERS_GET_ITEMS } from "../actions/websocketUser";

type WebsocketState = {
  wsConnected: boolean;
  items: IItemsResponse[];

  error?: Event;
};

export const initialState: WebsocketState = {
  wsConnected: false,
  items: [],
};

export const websocketUser = (state = initialState, action: TWebsocketUser) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,

        wsConnected: true,
        error: undefined,
      };
    case WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case WS_USER_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        items: [],
        wsConnected: false,
        error: undefined,
      };
    case WS_USER_ORDERS_GET_ITEMS:
      return {
        ...state,
        items: [action.payload],
        error: undefined,
      };

    default:
      return state;
  }
};
