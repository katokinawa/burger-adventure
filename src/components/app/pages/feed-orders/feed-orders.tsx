import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { useModal } from "../../../../hooks/useModal";
import {
  useDispatch,
  useSelector,
} from "../../../../utils/reduxCustomBoilerplate";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../../../services/actions/websocket";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "../../../../services/actions/ingredients";

export default function FeedOrders() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.websocket);
  const ingredients = useSelector((state) => state.ingredients);
  const location = useLocation();
  const { openModal } = useModal();
  const isModal: { background: boolean } = location.state?.background;
  const isOrderDetailRoute = location.pathname.startsWith("/feed/");

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    dispatch(getIngredients());
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      <Outlet />
      {!isOrderDetailRoute || isModal ? (
        <>
          <article className={styles.order_feed_wrapper}>
            <p className="text text_type_main-large">Лента заказов</p>
            <ul className={styles.order_items_list}>
              {items.map((items) => {
                return items.orders.map((order_item) => {
                  const totalPrice = order_item.ingredients.reduce(
                    (sum, ingredientId: string) => {
                      const ingredient = ingredients.items.find(
                        (item) => item._id === ingredientId
                      );
                      return sum + (ingredient?.price || 0);
                    },
                    0
                  );

                  const remainingIngredients =
                    order_item.ingredients.length - 6;

                  return (
                    <li
                      key={uuidv4()}
                      className={styles.order_item_card}
                      onClick={() => {
                        openModal({ _id: order_item._id }, "order");
                      }}
                    >
                      <div className={styles.order_item_header}>
                        <p className="text text_type_digits-default">
                          #{order_item.number}
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                          <FormattedDate
                            date={new Date(order_item.createdAt)}
                          />
                        </p>
                      </div>
                      <p className="text text_type_main-medium">
                        {order_item.name}
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
                                          isLast
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
          <article className={styles.statistics_panel}>
            <section className={styles.statistics_table}>
              <div className={styles.statistics_wrapper}>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <ul className={styles.statistics_orders_list}>
                  {items
                    .flatMap((current) => current.orders)
                    .slice(0, 10)
                    .map((current, i) => {
                      console.log(current);
                      if (current.status === "done") {
                        return (
                          <li key={i}>
                            <p
                              className={
                                styles.text_blue +
                                " " +
                                "text text_type_digits-default"
                              }
                            >
                              {current.number}
                            </p>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
              <div className={styles.statistics_wrapper}>
                <p className="text text_type_main-medium mb-6">В работе:</p>
                <ul className={styles.statistics_orders_list}>
                  {items
                    .flatMap((current) => current.orders)
                    .slice(0, 10)
                    .map((current, i) => {
                      if (current.status !== "done") {
                        return (
                          <li key={i}>
                            <p className="text text_type_digits-default">
                              {current.number}
                            </p>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </section>
            <section className={styles.statistics_counters}>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p
                className={
                  styles.digits_glow + " " + "text text_type_digits-large"
                }
              >
                {items[0]?.total}
              </p>
            </section>
            <section className={styles.statistics_counters}>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p
                className={
                  styles.digits_glow + " " + "text text_type_digits-large"
                }
              >
                {items[0]?.totalToday}
              </p>
            </section>
          </article>
        </>
      ) : null}
    </>
  );
}
