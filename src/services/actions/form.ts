import { request } from "../../utils/request";
import { getCookie } from "../../utils/getCookieValue";
import { AppDispatch, AppThunk, IUser } from "../../utils/types";

export const ADD_FORM_VALUE: 'ADD_FORM_VALUE' = "ADD_FORM_VALUE";

export const FORM_SUBMIT_REQUEST: 'FORM_SUBMIT_REQUEST' = "FORM_SUBMIT_REQUEST";
export const FORM_SUBMIT_SUCCESS: 'FORM_SUBMIT_SUCCESS' = "FORM_SUBMIT_SUCCESS";
export const FORM_SUBMIT_ERROR: 'FORM_SUBMIT_ERROR' = "FORM_SUBMIT_ERROR";

export const SHOW_PASSWORD_SWITCH: 'SHOW_PASSWORD_SWITCH' =
  "SHOW_PASSWORD_SWITCH";

export const RESET_ERROR_STATUS: 'RESET_ERROR_STATUS' = "RESET_ERROR_STATUS";
export const RESET_FORM: 'RESET_FORM' = "RESET_FORM";

export const SWITCH_INPUTS_EDIT: 'SWITCH_INPUTS_EDIT' = "SWITCH_INPUTS_EDIT";

export interface ISubmitItem {
  name: string;
  password?: string;
  email: string;
  code?: string;
  token?: string;
}

export interface IAddFormValue {
  readonly type: typeof ADD_FORM_VALUE;
  readonly field: string;
  readonly value: string | number;
}
export interface IFormSubmitRequest {
  readonly type: typeof FORM_SUBMIT_REQUEST;
}
export interface IFormSubmitSuccess {
  readonly type: typeof FORM_SUBMIT_SUCCESS;
  readonly item?: ISubmitItem;
}
export interface IFormSubmitError {
  readonly type: typeof FORM_SUBMIT_ERROR;
  errorStatusCode: number;
}
export interface IShowPasswordSwitch {
  readonly type: typeof SHOW_PASSWORD_SWITCH;
}
export interface IResetErrorStatus {
  readonly type: typeof RESET_ERROR_STATUS;
}
export interface IResetForm {
  readonly type: typeof RESET_FORM;
}
export interface ISwitchInputsEdit {
  readonly type: typeof SWITCH_INPUTS_EDIT;
}

export type TFormsActions =
  | IAddFormValue
  | IFormSubmitRequest
  | IFormSubmitSuccess
  | IFormSubmitError
  | IShowPasswordSwitch
  | IResetErrorStatus
  | IResetForm
  | ISwitchInputsEdit;

export const setFormValue = (
  field: string,
  value: string | number
): IAddFormValue => ({
  type: ADD_FORM_VALUE,
  field,
  value,
});

export const submitLogin =
  (formValues: IUser): AppThunk => (dispatch: AppDispatch) => {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });

    request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });

        document.cookie = `accessToken=${item.accessToken}; max-age=1200;`;
        document.cookie = `refreshToken=${item.refreshToken};`;
      })
      .catch((errorStatusCode) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          errorStatusCode,
        });
      });
  };

export const submitRegister =
  (formValues: IUser): AppThunk => (dispatch: AppDispatch) => {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
        document.cookie = `accessToken=${item.accessToken}; max-age=1200;`;
        document.cookie = `refreshToken=${item.refreshToken};`;
        window.history.pushState(null, "", "burger-restaurant/#/");
        window.history.go(0);
      })
      .catch((errorStatusCode) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          errorStatusCode,
        });
      });
  };

export const submitForgotPassword =
  (formValues: IUser): AppThunk => (dispatch: AppDispatch) => {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    if (formValues) {
      request("password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((item) => {
          dispatch({
            type: FORM_SUBMIT_SUCCESS,
            item,
          });
          localStorage.setItem("forgot_password", "true");
          window.history.pushState(null, "", "burger-restaurant/#/reset-password");
          window.history.go(0);
        })
        .catch((errorStatusCode) => {
          dispatch({
            type: FORM_SUBMIT_ERROR,
            errorStatusCode,
          });
        });
    }
  };

export const submitResetPassword =
  (formValues: IUser): AppThunk => (dispatch: AppDispatch) => {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
        window.history.pushState(null, "", "burger-restaurant/#/login");
        window.history.go(0);
      })
      .catch((errorStatusCode) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          errorStatusCode,
        });
      });
  };

export const submitLogout = (): AppThunk => (dispatch: AppDispatch) => {
  const refreshToken = getCookie().refreshToken;

  dispatch({
    type: FORM_SUBMIT_REQUEST,
  });
  request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(() => {
      dispatch({
        type: FORM_SUBMIT_SUCCESS,
      });
      document.cookie = "accessToken=;max-age=0";
      document.cookie = "refreshToken=;max-age=0";
      window.history.pushState(null, "", "burger-restaurant/#/login");
      window.history.go(0);
    })
    .catch((errorStatusCode) => {
      dispatch({
        type: FORM_SUBMIT_ERROR,
        errorStatusCode,
      });
    });
};

export const submitRefreshToken = (): AppThunk => (dispatch: AppDispatch) => {
  const refreshToken = getCookie().refreshToken;
  dispatch({
    type: FORM_SUBMIT_REQUEST,
  });
  request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((item) => {
      dispatch({
        type: FORM_SUBMIT_SUCCESS,
        item,
      });

      document.cookie = `accessToken=${item.accessToken}; max-age=1200;`;
      document.cookie = `refreshToken=${item.refreshToken};`;
      window.history.go(0);
    })
    .catch((errorStatusCode) => {
      dispatch({
        type: FORM_SUBMIT_ERROR,
        errorStatusCode,
      });
    });
};

export const submitGetPersonValues =
  (formValues?: IUser): AppThunk => (dispatch: AppDispatch) => {
    const token = getCookie().accessToken;
    if (token) {
      dispatch({
        type: FORM_SUBMIT_REQUEST,
      });
      request("auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(formValues),
      })
        .then((userData) => {
          const item = {
            name: userData.user.name,
            email: userData.user.email,
          }
          dispatch({
            type: FORM_SUBMIT_SUCCESS,
            item
          });
        })
        .catch((errorStatusCode) => {
          dispatch({
            type: FORM_SUBMIT_ERROR,
            errorStatusCode,
          });
        });
    } else {
      dispatch(submitRefreshToken());
    }
  };
