import { request } from "../../utils/request";
import { AppDispatch, IItem } from "../../utils/types";
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' =
  "GET_INGREDIENTS_ERROR";
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  "GET_INGREDIENTS_SUCCESS";

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsError {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: IItem[];
}
export type TIngredients =
  | IGetIngredientsRequest
  | IGetIngredientsError
  | IGetIngredientsSuccess;

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  request("ingredients", {})
    .then((item) => {
      if (item.data) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: item.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: GET_INGREDIENTS_ERROR,
      });
    });
};
