import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orders.module.css";
import { useModal } from "../../../../hooks/useModal";
import { Outlet, useLocation } from "react-router-dom";
import { getIngredients } from "../../../../services/actions/ingredients";
import {
  useDispatch,
  useSelector,
} from "../../../../utils/reduxCustomBoilerplate";
import { useEffect, useState } from "react";
import {
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_START,
} from "../../../../services/actions/websocketUser";
import { IItemsResponseOrders } from "../../../../utils/types";

export default function Orders() {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const location = useLocation();
  const { items } = useSelector((state) => state.websocketUser);
  const ingredients = useSelector((state) => state.ingredients);
  const isModal: { background: boolean } = location.state?.background ?? false;
  const isOrderDetailRoute = location.pathname.startsWith("/profile/orders/");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: WS_USER_ORDERS_CONNECTION_START });
    dispatch(getIngredients());

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  if (items[0]?.message === "Invalid or missing token") {
    return (
      <>
        <p className={styles.ws_status_message}>Токен недействителен</p>
      </>
    );
  }

  if (isLoading) {
    return <p className={"text text_type_main-medium" + " " + styles.ws_status_message}>Загрузка...</p>;
  }

  const statusOrder = (order: IItemsResponseOrders) => {
    switch (order.status) {
      case "done": {
        return "Выполнен";
      }
      case "cancel": {
        return "Отменён";
      }
      case "pending": {
        return "Создан";
      }
      default: {
        return "Статус неизвестен";
      }
    }
  };

  return (
    <>
      <Outlet />
      {!isOrderDetailRoute || isModal ? (
        <>
          <article className={styles.order_user_wrapper}>
            <ul className={styles.order_items_list}>
              {items.map((items) => {
                return [...items.orders].reverse().map((order_item) => {
                  const totalPrice = order_item.ingredients.reduce(
                    (sum, ingredientId: string) => {
                      const ingredient = ingredients.items.find(
                        (item) => item._id === ingredientId
                      );
                      if (ingredient) {
                        return sum + (ingredient.price || 0);
                      }
                      return 0;
                    },
                    0
                  );

                  const remainingIngredients =
                    order_item.ingredients.length - 6;

                  return (
                    <li
                      key={order_item._id}
                      className={styles.order_item_card}
                      onClick={() => {
                        openModal(order_item, "profile-order");
                      }}
                    >
                      <div className={styles.order_item_header}>
                        <p className="text text_type_digits-default">
                          #{order_item.number}
                        </p>
                        <p
                          className={
                            "text text_type_main-default text_color_inactive"
                          }
                        >
                          <FormattedDate
                            date={new Date(order_item.createdAt)}
                          />
                        </p>
                      </div>
                      <p className="text text_type_main-medium">
                        {order_item.name}
                      </p>
                      <p
                        className={`text text_type_main-default text_color_inactive ${
                          order_item.status === "done" ? styles.text_blue : ""
                        }`}
                      >
                        {statusOrder(order_item)}
                      </p>
                      <div className={styles.order_item_header}>
                        <div className={styles.order_ingredients_wrapper}>
                          {order_item.ingredients
                            .slice(0, 6)
                            .map((ingredientId, index) => {
                              const ingredient = ingredients.items.find(
                                (item) => item._id === ingredientId
                              );
                              const isLast =
                                index === 0 && remainingIngredients > 0;
                              return (
                                ingredient && (
                                  <div
                                    key={index}
                                    className={
                                      styles.order_ingredient_icon_wrapper
                                    }
                                  >
                                    <div
                                      className={
                                        styles.order_ingredient_icon_wrapper_black
                                      }
                                    >
                                      <img
                                        className={
                                          styles.order_ingredient_image + isLast
                                            ? styles.order_ingredient_icon_low_opacity
                                            : styles.order_ingredient_icon_image
                                        }
                                        src={ingredient.image}
                                        alt={ingredient.name}
                                      />
                                      {isLast && (
                                        <p
                                          className={
                                            styles.remaining_ingredients +
                                            " " +
                                            "text text_type_digits-default"
                                          }
                                        >
                                          +{remainingIngredients}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )
                              );
                            })}
                        </div>
                        <div className={styles.order_price_wrapper}>
                          <p className="text text_type_main-medium">
                            {totalPrice}
                          </p>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    </li>
                  );
                });
              })}
            </ul>
          </article>
        </>
      ) : null}
    </>
  );
}
