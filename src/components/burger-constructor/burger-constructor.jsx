import { useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <section className={styles.burger_constructor}>
      <Modal isModalOpen={isModalOpen} handleClose={handleCloseModal}>
        <OrderDetails />
      </Modal>
      <div className={styles.constructor_wrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={
            data.find((item) => item.name === "Краторная булка N-200i")?.price
          }
          thumbnail={
            data.find((item) => item.name === "Краторная булка N-200i")?.image
          }
        />
        <div className={styles.constructor_list_wrapper}>
          {data
            .map(
              (item) =>
                item.type !== "bun" && (
                  <article
                    key={item._id}
                    className={styles.constructor_item_wrapper}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </article>
                )
            )
            .slice(0, 6)}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={
            data.find((item) => item.name === "Краторная булка N-200i")?.price
          }
          thumbnail={
            data.find((item) => item.name === "Краторная булка N-200i")?.image
          }
        />
      </div>
      <div className={styles.form_total_wrapper}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_main-large">0</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
