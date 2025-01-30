import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  RESET_ERROR_STATUS,
  submitResetPassword,
} from "../../../../services/actions/form";
import { useEffect } from "react";

export function ResetPassword() {
  const dispatch = useDispatch();
  const {
    onShowPasswordSwitch,
    onFormChange,
    passwordValue,
    code,
    passwordVisible,
    formRequest,
    formError,
  } = useForm();

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
          errorText={passwordValue === "" ? "Поле не может быть пустым" : ""}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onFormChange}
          value={code}
          name={"code"}
          error={formError}
          errorText={passwordValue === "" ? "Поле не может быть пустым" : ""}
          size={"default"}
          extraClass="ml-1"
        />
        {formError && (
          <p className="text text_type_main-small">
            Введены некорректные данные
          </p>
        )}
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
