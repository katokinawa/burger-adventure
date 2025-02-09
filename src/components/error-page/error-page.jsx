import styles from "./error-page.module.css";

export const ErrorPage = () => {
  return (
    <p className={"text text_type_main-large" + " " + styles.error_wrapper}>
      Страница не найдена
    </p>
  );
};
