import { IItemsResponse } from "../../utils/types";
import {
  TWebsocket,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ITEMS,
} from "../actions/websocket";

type WebsocketState = {
  wsConnected: boolean;
  items: IItemsResponse[];

  error?: Event;
};

export const initialState: WebsocketState = {
  wsConnected: false,
  items: [],
};

export const websocket = (state = initialState, action: TWebsocket) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    case WS_GET_ITEMS:
      return {
        ...state,
        items: [action.payload],
        error: undefined,
      };
    default:
      return state;
  }
};
