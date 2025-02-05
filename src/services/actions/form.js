import { request } from "../../utils/request";
import { getCookie } from "../../utils/getCookieValue";

export const ADD_FORM_VALUE = "ADD_FORM_VALUE";

export const FORM_SUBMIT_REQUEST = "FORM_SUBMIT_REQUEST";
export const FORM_SUBMIT_SUCCESS = "FORM_SUBMIT_SUCCESS";
export const FORM_SUBMIT_ERROR = "FORM_SUBMIT_ERROR";

export const SHOW_PASSWORD_SWITCH = "SHOW_PASSWORD_SWITCH";

export const RESET_ERROR_STATUS = "RESET_ERROR_STATUS";

export const SWITCH_FIELD_EDIT = "SWITCH_FIELD_EDIT"

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
          window.history.replaceState(null, "", "/reset-password");
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
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitGetPersonValues() {
  return async function (dispatch) {
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
      })
        .then((item) => {
          dispatch({
            type: FORM_SUBMIT_SUCCESS,
          });

          // Перебираем все поля в объекте с данными пользователя и добавляем в форму
          // так мы точно знаем, что в случае добавления доп. полей мы переберём
          // все ключи и значения
          for(var key in item.user) {
            dispatch(setFormValue(key, item.user[key]));
          }
        })
        .catch((error) => {
          dispatch({
            type: FORM_SUBMIT_ERROR,
            error,
          });
        });
    } else {
      try {
        dispatch(submitRefreshToken());
      } catch (error) {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      }
    }
  };
}
