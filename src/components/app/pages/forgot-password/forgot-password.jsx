import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  RESET_ERROR_STATUS,
  submitForgotPassword,
} from "../../../../services/actions/form";
import { useEffect } from "react";
import { getCookie } from "../../../../utils/getCookieValue";

export function ForgotPassword() {
  const dispatch = useDispatch();
  const {
    onFormChange,
    handleFocus,
    showMessageStatus,
    emailValue,
    formRequest,
    formErrorStatus,
  } = useForm();
  const token = getCookie().refreshToken;

  useEffect(() => {
    dispatch({ type: RESET_ERROR_STATUS });
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForgotPassword({ email: emailValue }));
  };
  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className={styles.forgot_password}>
      <form className={styles.forgot_password_form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          onChange={onFormChange}
          placeholder={"Укажите e-mail"}
          value={emailValue === undefined ? "" : emailValue}
          name={"email"}
          isIcon={false}
          error={formErrorStatus}
          errorText={""}
          required={true}
          onFocus={handleFocus}
        />
        <p className="text text_type_main-small">
          {formErrorStatus && showMessageStatus("")}
        </p>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={formRequest}
        >
          Восстановить
        </Button>
      </form>
      <div className={styles.forgot_password_footer}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <span className={styles.forgot_password_footer_span}>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
