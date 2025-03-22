import {
  ADD_FORM_VALUE,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  RESET_ERROR_STATUS,
  RESET_FORM,
  SHOW_PASSWORD_SWITCH,
} from "../actions/form";
import { initialState, form } from "./form";

describe("form reducer", () => {
  const formValues = {
    name: "",
    password: "",
    passwordVisible: false,
    email: "",
    code: "",
    token: "",
  };

  const field = "test";
  const value = "test";
  const valueNumber = 0;

  it("should return the initial state of form", () => {
    expect(form(undefined, { type: "" } as never)).toEqual(initialState);
  });

  it("should handle FORM_SUBMIT_REQUEST", () => {
    expect(
      form(undefined, {
        type: FORM_SUBMIT_REQUEST,
      })
    ).toEqual({ ...initialState, formRequest: true });
  });

  it("should handle FORM_SUBMIT_SUCCESS", () => {
    expect(
      form(undefined, {
        type: FORM_SUBMIT_SUCCESS,
        item: formValues,
      })
    ).toEqual({
      ...initialState,
      form: { ...initialState.form, ...formValues },
      formRequest: false,
      formErrorStatus: false,
      formSuccess: true,
      formErrorStatusCode: 0,
    });
  });

  it("should handle FORM_SUBMIT_SUCCESS_NO_PAYLOAD", () => {
    expect(
      form(undefined, {
        type: FORM_SUBMIT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      form: { ...formValues },
      formRequest: false,
      formErrorStatus: false,
      formSuccess: true,
      formErrorStatusCode: 0,
    });
  });

  it("should handle FORM_SUBMIT_ERROR_STATUS_500", () => {
    expect(
      form(undefined, {
        type: FORM_SUBMIT_ERROR,
        errorStatusCode: 500,
      })
    ).toEqual({
      ...initialState,
      formRequest: false,
      formErrorStatus: true,
      formSuccess: false,
      formErrorStatusCode: 500,
    });
  });

  it("should handle FORM_SUBMIT_ERROR_STATUS_403", () => {
    expect(
      form(undefined, {
        type: FORM_SUBMIT_ERROR,
        errorStatusCode: 403,
      })
    ).toEqual({
      ...initialState,
      formRequest: false,
      formErrorStatus: true,
      formSuccess: false,
      formErrorStatusCode: 403,
    });
  });

  it("should handle FORM_SUBMIT_ERROR_STATUS_409", () => {
    expect(
      form(undefined, {
        type: FORM_SUBMIT_ERROR,
        errorStatusCode: 409,
      })
    ).toEqual({
      ...initialState,
      formRequest: false,
      formErrorStatus: true,
      formSuccess: false,
      formErrorStatusCode: 409,
    });
  });

  it("should handle SHOW_PASSWORD_SWITCH", () => {
    expect(
      form(undefined, {
        type: SHOW_PASSWORD_SWITCH,
      })
    ).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        passwordVisible: !initialState.form.passwordVisible,
      },
    });
  });

  it("should handle ADD_FORM_VALUE", () => {
    expect(
      form(undefined, {
        type: ADD_FORM_VALUE,
        field,
        value,
      })
    ).toEqual({ ...initialState, form: {...initialState.form, [field]: value } });
  });

  it("should handle ADD_FORM_VALUE_VALUE_NUMBER", () => {
    expect(
      form(undefined, {
        type: ADD_FORM_VALUE,
        field,
        value: valueNumber,
      })
    ).toEqual({ ...initialState, form: {...initialState.form, [field]: valueNumber } });
  });

  it("should handle RESET_ERROR_STATUS", () => {
    expect(
      form(undefined, {
        type: RESET_ERROR_STATUS,
      })
    ).toEqual({
      ...initialState,
      formErrorStatus: false,
      formSuccess: false,
    });
  });

  it("should handle RESET_FORM", () => {
    expect(
      form(undefined, {
        type: RESET_FORM,
      })
    ).toEqual({ ...initialState });
  });
});
