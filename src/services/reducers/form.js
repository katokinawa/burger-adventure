import {
  ADD_FORM_VALUE,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  RESET_ERROR_STATUS,
  RESET_FORM,
  SHOW_PASSWORD_SWITCH,
} from "../actions/form";

const initialState = {
  form: {
    name: "",
    password: "",
    passwordVisible: false,
    email: "",
    code: "",
    token: "",
  },
  formRequest: false,
  formError: false,
  formErrorMessage: "",
};

export const form = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUBMIT_REQUEST: {
      return {
        ...state,
        formRequest: true,
      };
    }
    case FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        formRequest: false,
        formError: false,
      };
    }
    case FORM_SUBMIT_ERROR: {
      return {
        ...state,
        formRequest: false,
        formError: true,
        formErrorMessage: action.error,
      };
    }
    case SHOW_PASSWORD_SWITCH: {
      return {
        ...state,
        form: {
          ...state.form,
          passwordVisible: !state.form.passwordVisible,
        },
      };
    }
    case ADD_FORM_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }
    case RESET_ERROR_STATUS: {
      return {
        ...state,
        formError: false,
      };
    }
    case RESET_FORM: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
