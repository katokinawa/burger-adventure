import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import {
  RESET_ERROR_STATUS,
  submitRegister,
} from "../../../../services/actions/form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../../../../utils/getCookieValue";

export function Register() {
  const dispatch = useDispatch();
  const {
    onShowPasswordSwitch,
    onFormChange,
    handleFocus,
    showMessageStatus,
    nameValue,
    emailValue,
    passwordValue,
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
      submitRegister({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className={styles.register}>
      <form className={styles.register_form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onFormChange}
          value={nameValue}
          name={"name"}
          error={formErrorStatus}
          errorText={""}
          size={"default"}
          extraClass="ml-1"
          required={true}
          // При фокусе сбрасывается красный контур ошибки у инпутов, чтобы психологически не давить на юзера
          onFocus={handleFocus}
        />
        <EmailInput
          onChange={onFormChange}
          placeholder={"Почта"}
          value={emailValue}
          name={"email"}
          error={formErrorStatus}
          errorText={""}
          required={true}
          onFocus={handleFocus}
        />
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={onFormChange}
          icon={passwordVisible ? "HideIcon" : "ShowIcon"}
          value={passwordValue}
          name={"password"}
          error={formErrorStatus}
          onIconClick={onShowPasswordSwitch}
          errorText={""}
          size={"default"}
          extraClass="ml-1"
          required={true}
          onFocus={handleFocus}
        />
        <p className="text text_type_main-small">
          {formErrorStatus && showMessageStatus("Пользователь уже существует")}
        </p>

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={formRequest}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.register_footer}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <span className={styles.register_footer_span}>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
