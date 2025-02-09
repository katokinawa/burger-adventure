import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.nav_left}>
          <li>
            <NavLink to={"/"} end>
              {({ isActive }) => (
                <button className={styles.button}>
                  <BurgerIcon type={!isActive ? "secondary" : "primary"} />
                  <p
                    className={`"text text_type_main-default "
                      ${!isActive && "text_color_inactive"}`}
                  >
                    Конструктор
                  </p>
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/profile/orders"} end>
              {({ isActive }) => (
                <button className={styles.button}>
                  <ListIcon type={!isActive ? "secondary" : "primary"} />
                  <p
                    className={`"text text_type_main-default " ${
                      !isActive && "text_color_inactive"
                    }`}
                  >
                    Лента заказов
                  </p>
                </button>
              )}
            </NavLink>
          </li>
        </ul>
        <div className={styles.nav_center}>
          <Logo />
        </div>
        <ul className={styles.nav_right}>
          <li>
            <NavLink to={"/profile"} end>
              {({ isActive }) => (
                <button className={styles.button}>
                  <ProfileIcon type={!isActive ? "secondary" : "primary"} />
                  <p
                    className={`"text text_type_main-default " ${
                      !isActive && "text_color_inactive"
                    }`}
                  >
                    Личный кабинет
                  </p>
                </button>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
