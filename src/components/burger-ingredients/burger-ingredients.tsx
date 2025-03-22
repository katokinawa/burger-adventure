import { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/useModal";

import { getIngredients } from "../../services/actions/ingredients";
import IngredientElement from "../ingredient-element/ingredient-element";
import { IItem } from "../../utils/types";
import { useDispatch, useSelector } from "../../utils/reduxCustomBoilerplate";

export default function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const { openModal } = useModal();

  const containerRef = useRef<HTMLInputElement>(null);
  const bunRef = useRef<HTMLInputElement>(null);
  const sauceRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (
      !containerRef.current ||
      !bunRef.current ||
      !sauceRef.current ||
      !mainRef.current
    )
      return;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    const bunTop = bunRef.current.getBoundingClientRect().top - containerTop;
    // Увеличиваем на 30 пикселей, потому что блок с <p></p>
    // при переходе по якорной ссылке по табу вычисляется как 0,
    // и в табе активным становится следующий ингредиент
    const sauceTop =
      sauceRef.current.getBoundingClientRect().top - containerTop + 30;
    const mainTop = mainRef.current.getBoundingClientRect().top - containerTop;

    const tabs = [
      { name: "bun", position: bunTop },
      { name: "sauce", position: sauceTop },
      { name: "main", position: mainTop },
    ];

    const visibleTabs = tabs.filter((tab) => tab.position >= 0);

    let currentTab;
    if (visibleTabs.length > 0) {
      currentTab = tabs.find((item) => item.position >= 0);
    } else if (visibleTabs.length < 0) {
      // в случае, если никакой заголовок не виден на экране, показывать последний из таба
      currentTab = tabs[tabs.length - 1];
    } else {
      currentTab = { name: "bun", position: 0 };
    }

    if (!currentTab) {
      // если currentTab все еще undefined, назначаем дефолтное значение
      currentTab = { name: "bun", position: 0 };
    }

    setCurrent(currentTab.name);
  };

  return (
    <section className={styles.burger_ingredients}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <a href="#bun">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauce">
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#main">
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div ref={containerRef} className={styles.ingredients_wrapper}>
        <p id="bun" ref={bunRef} className="text text_type_main-medium mb-6">
          Булки
        </p>
        <div className={styles.ingredients_list} data-testid="ingredients-elements-block">
          {ingredients.map(
            (item: IItem) =>
              item.type === "bun" && (
                <IngredientElement
                  key={item._id}
                  item={item}
                  type={item.type}
                  openModal={openModal}
                />
              )
          )}
        </div>
        <p
          id="sauce"
          ref={sauceRef}
          className="text text_type_main-medium mb-6"
        >
          Соусы
        </p>
        <div className={styles.ingredients_list} data-testid="ingredients-elements-block">
          {ingredients.map(
            (item: IItem) =>
              item.type === "sauce" && (
                <IngredientElement
                  key={item._id}
                  item={item}
                  type={item.type}
                  openModal={openModal}
                />
              )
          )}
        </div>
        <p id="main" ref={mainRef} className="text text_type_main-medium mb-6">
          Начинки
        </p>
        <div className={styles.ingredients_list} data-testid="ingredients-elements-block">
          {ingredients.map(
            (item: IItem) =>
              item.type === "main" && (
                <IngredientElement
                  key={item._id}
                  item={item}
                  type={item.type}
                  openModal={openModal}
                />
              )
          )}
        </div>
      </div>
    </section>
  );
}
