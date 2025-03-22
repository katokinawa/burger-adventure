import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/useModal";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {
  ADD_BURGER_BUN,
  addIngredient,
  DELETE_BURGER_INGREDIENT,
  RESET_BURGER_CONSTRUCTOR,
  SWAP_BURGER_INGREDIENT,
} from "../../services/actions/burger-constructor";
import cloudIcon from "../../images/cloud.svg";
import { postOrder } from "../../services/actions/order-detail";
import { getCookie } from "../../utils/getCookieValue";
import { useNavigate } from "react-router-dom";
import { IItem } from "../../utils/types";
import { useDispatch, useSelector } from "../../utils/reduxCustomBoilerplate";

export default function BurgerConstructor() {
  const { openModal } = useModal();
  const token = getCookie().refreshToken;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.burger_constructor.items);
  const bun = useSelector((state) => state.burger_constructor.buns);

  let bunItem;
  let sum = ingredients.reduce((summarize, item) => summarize + item.price, 0);

  if (bun && bun.length) {
    sum += bun[0].price * 2;
    bunItem = bun[0];
  }

  const collectArrayId = (): { ingredients: string[] } => {
    if (bun && bun.length) {
      const bunId = bun[0]._id;
      const arr = [bunId, ...ingredients.map((item: IItem) => item._id), bunId];
      return { ingredients: arr };
    } else {
      return { ingredients: [] };
    }
  };

  const handlePostOrder = (): void => {
    dispatch(postOrder(collectArrayId()));
    dispatch({ type: RESET_BURGER_CONSTRUCTOR });
  };

  const handleMoveItem = (
    dragItemIndex: number,
    dropItemIndex: number
  ): void => {
    const updatedIngredients = [...ingredients];
    const temp = updatedIngredients[dropItemIndex];
    updatedIngredients[dropItemIndex] = updatedIngredients[dragItemIndex];
    updatedIngredients[dragItemIndex] = temp;
    handleSwapBurgerIngredient(updatedIngredients);
  };

  const handleDeleteItem = (index: number): void => {
    const deleteIngredient = [...ingredients];
    deleteIngredient.splice(index, 1);
    handleDeleteIngredient(deleteIngredient);
  };

  const handleDeleteIngredient = (item: IItem[]): void => {
    dispatch({
      type: DELETE_BURGER_INGREDIENT,
      item,
    });
  };

  const handleSwapBurgerIngredient = (item: IItem[]) => {
    dispatch({
      type: SWAP_BURGER_INGREDIENT,
      item,
    });
  };

  const handleDropBun = (item: IItem) => {
    dispatch({
      type: ADD_BURGER_BUN,
      item,
    });
  };

  const handleDrop = (item: IItem) => {
    dispatch(addIngredient(item));
  };

  // DND (drag and drop)
  const [, dropTargetBunsTop] = useDrop({
    accept: "bun",
    drop(item: IItem) {
      handleDropBun(item);
    },
  });
  const [, dropTargetBunsBottom] = useDrop({
    accept: "bun",
    drop(item: IItem) {
      handleDropBun(item);
    },
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IItem) {
      handleDrop(item);
    },
  });

  return (
    <section className={styles.burger_constructor}>
      {(bun && !bun.length) || !bun ? (
        <div
          ref={dropTargetBunsTop}
          className={styles.constructor_bun_wrapper}
          data-testid="сonstructor-ingredients-block-bun"
        >
          <div className={styles.constructor_wrapper_bun_hover}>
            <div className={styles.dnd_bun_wrapper}>
              <p className="text text_type_main-default">
                Drag and drop the bun here
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={dropTargetBunsTop}
          className={styles.constructor_bun_wrapper}
          data-testid="bun-constructor-element"
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bunItem ? bunItem.name + " (верх)" : ""}
            price={bunItem ? bunItem.price : 0}
            thumbnail={bunItem ? bunItem.image : ""}
          />
        </div>
      )}
      {!ingredients.length ? (
        <div
          ref={dropTarget}
          className={styles.constructor_wrapper_hover}
          data-testid="сonstructor-ingredients-block-ingredient"
        >
          <div className={styles.dnd_wrapper}>
            <img src={cloudIcon} alt="Облако с иконкой загрузки" />
            <p className="text text_type_main-medium mb-6">
              Drag and drop the ingredients here
            </p>
          </div>
        </div>
      ) : (
        <div ref={dropTarget} className={styles.constructor_wrapper}>
          <div
            className={styles.constructor_list_wrapper}
            data-testid="ingredient-constructor-element"
          >
            {ingredients.map(
              (item: IItem, index: number) =>
                item.type !== "bun" && (
                  <BurgerConstructorElement
                    key={item.uniqueId}
                    item={item}
                    index={index}
                    moveItem={handleMoveItem}
                    deleteItem={handleDeleteItem}
                  />
                )
            )}
          </div>
        </div>
      )}

      {(bun && !bun.length) || !bun ? (
        <div
          ref={dropTargetBunsBottom}
          className={styles.constructor_bun_wrapper}
        >
          <div className={styles.constructor_wrapper_bun_hover}>
            <div className={styles.dnd_bun_wrapper}>
              <p className="text text_type_main-default">
                Drag and drop the bun here
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={dropTargetBunsBottom}
          className={styles.constructor_bun_wrapper}
          data-testid="bun-constructor-element"
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bunItem ? bunItem.name + " (низ)" : ""}
            price={bunItem ? bunItem.price : 0}
            thumbnail={bunItem ? bunItem.image : ""}
          />
        </div>
      )}

      <div className={styles.form_total_wrapper}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_main-large">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
          <Button
            onClick={() => {
              if (token) {
                handlePostOrder();
                openModal({}, "postorder");
              } else {
                navigate("/login");
              }
            }}
            htmlType="button"
            type="primary"
            size="large"
            disabled={bun && (!ingredients.length || !bun.length)}
            extraClass="open-modal-button"
          >
            Оформить заказ
          </Button>
      </div>
    </section>
  );
}
