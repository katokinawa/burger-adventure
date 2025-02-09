import { request } from "../../utils/request";
import { getCookie } from "../../utils/getCookieValue";

export const ADD_FORM_VALUE = "ADD_FORM_VALUE";

export const FORM_SUBMIT_REQUEST = "FORM_SUBMIT_REQUEST";
export const FORM_SUBMIT_SUCCESS = "FORM_SUBMIT_SUCCESS";
export const FORM_SUBMIT_ERROR = "FORM_SUBMIT_ERROR";

export const SHOW_PASSWORD_SWITCH = "SHOW_PASSWORD_SWITCH";

export const RESET_ERROR_STATUS = "RESET_ERROR_STATUS";
export const RESET_FORM = "RESET_FORM";

export const SWITCH_INPUTS_EDIT = "SWITCH_INPUTS_EDIT";

export const setFormValue = (field, value) => ({
  type: ADD_FORM_VALUE,
  field,
  value,
});

export function submitLogin(formValues) {
  return function (dispatch) {
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
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitRegister(formValues) {
  return function (dispatch) {
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
        window.history.pushState(null, "", "/");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitForgotPassword(formValues) {
  return function (dispatch) {
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
          localStorage.setItem("forgot_password", true);
          window.history.pushState(null, "", "/reset-password");
          window.history.go(0);
        })
        .catch(() => {
          dispatch({
            type: FORM_SUBMIT_ERROR,
          });
        });
    }
  };
}

export function submitResetPassword(formValues) {
  return function (dispatch) {
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
        window.history.pushState(null, "", "/login");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitLogout() {
  return function (dispatch) {
    let refreshToken = getCookie().refreshToken;

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
        window.history.pushState(null, "", "/login");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitRefreshToken() {
  return function (dispatch) {
    let refreshToken = getCookie().refreshToken;
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
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitGetPersonValues(formValues) {
  return function (dispatch) {
    let token = getCookie().accessToken;
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
        .then((item) => {
          const res = item.user;
          dispatch({
            type: FORM_SUBMIT_SUCCESS,
            name: res.name,
            email: res.email,
          });
        })
        .catch((error) => {
          dispatch({
            type: FORM_SUBMIT_ERROR,
            error,
          });
        });
    } else {
      dispatch(submitRefreshToken());
    }
  };
}
