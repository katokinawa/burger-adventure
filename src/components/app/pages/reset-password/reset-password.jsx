import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  RESET_ERROR_STATUS,
  submitResetPassword,
} from "../../../../services/actions/form";
import { useEffect } from "react";
import { getCookie } from "../../../../utils/getCookieValue";

export function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    onShowPasswordSwitch,
    onFormChange,
    handleFocus,
    showMessageStatus,
    passwordValue,
    code,
    passwordVisible,
    formRequest,
    formErrorStatus,
  } = useForm();
  const token = getCookie().refreshToken;

  useEffect(() => {
    dispatch({ type: RESET_ERROR_STATUS });
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      submitResetPassword({
        password: passwordValue,
        token: code,
      })
    );
  };
  if (location.state === null) {
    return <Navigate to="/forgot-password" replace />;
  }
  if (token) {
    return <Navigate to="/" replace />;
  }
  if (location.state.forgot_password === true) {
    return (
      <section className={styles.reset_password}>
        <form className={styles.reset_password_form} onSubmit={onSubmit}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={onFormChange}
            icon={passwordVisible ? "HideIcon" : "ShowIcon"}
            value={passwordValue}
            name={"password"}
            error={false}
            onIconClick={onShowPasswordSwitch}
            errorText={""}
            size={"default"}
            extraClass="ml-1"
            required={true}
            onFocus={handleFocus}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onFormChange}
            value={code}
            name={"code"}
            error={formErrorStatus}
            errorText={""}
            size={"default"}
            extraClass="ml-1"
            required={true}
            onFocus={handleFocus}
          />
          <p className="text text_type_main-small">
            {formErrorStatus &&
              showMessageStatus("Введены некорректные данные")}
          </p>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={formRequest}
          >
            Сохранить
          </Button>
        </form>
        <div className={styles.reset_password_footer}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <span className={styles.reset_password_footer_span}>
              <Link to="/login">Войти</Link>
            </span>
          </p>
        </div>
      </section>
    );
  }
}
