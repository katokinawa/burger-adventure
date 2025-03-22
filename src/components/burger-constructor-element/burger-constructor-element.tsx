import styles from "./burger-constructor-element.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { IItem } from "../../utils/types";

export default function BurgerConstructorElement({
  item,
  index,
  moveItem,
  deleteItem,
}: {
  item: IItem;
  index: number;
  moveItem: (dragItemIndex: number, dropItemIndex: number) => void;
  deleteItem: (index: number) => void;
}) {
  // DND (drag and drop)
  const [, dropItemTarget] = useDrop({
    accept: "ingredientItem",
    drop(draggedItem: { item: IItem; index: number }) {
      moveItem(draggedItem.index, index);
    },
  });
  const [, dragItemTarget] = useDrag({
    type: "ingredientItem",
    item: {
      item: item,
      index: index,
    },
  });

  return (
    <article ref={dropItemTarget} data-testid="constructor-ingredient">
      <div ref={dragItemTarget} className={styles.constructor_item_wrapper}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          handleClose={() => deleteItem(index)}
          thumbnail={item.image}
        />
      </div>
    </article>
  );
}
