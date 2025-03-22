import {
  ADD_FORM_VALUE,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  RESET_ERROR_STATUS,
  RESET_FORM,
  SHOW_PASSWORD_SWITCH,
  TFormsActions,
} from "../actions/form";

export interface IFormValues {
  name: string;
  password: string;
  passwordVisible: boolean;
  email: string;
  code: string;
  token: string;
}

type TFormState = {
  form: IFormValues;
  formRequest: boolean;
  formErrorStatus: boolean;
  formSuccess: boolean;
  formErrorStatusCode: number;
};

export const initialState: TFormState = {
  form: {
    name: "",
    password: "",
    passwordVisible: false,
    email: "",
    code: "",
    token: "",
  },
  formRequest: false,
  formErrorStatus: false,
  formSuccess: false,
  formErrorStatusCode: 0,
};

export const form = (state = initialState, action: TFormsActions) => {
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
          ...state.form,
          ...action.item,
        },
        formRequest: false,
        formErrorStatus: false,
        formSuccess: true,
        formErrorStatusCode: 0,
      };
    }
    case FORM_SUBMIT_ERROR: {
      return {
        ...state,
        formRequest: false,
        formErrorStatus: true,
        formSuccess: false,
        formErrorStatusCode: action.errorStatusCode,
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
        formErrorStatus: false,
        formSuccess: false,
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
