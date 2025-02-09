import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const { ingredientId } = useParams();
  const ingredients = useSelector((state) => state.ingredients.items);

  const ingredient = ingredients.find((item) => {
    return item._id === ingredientId;
  });

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.ingredients_modal_wrapper}>
      <p className={styles.heading + " text text_type_main-large"}>
        Детали ингредиента
      </p>
      <div className={styles.ingredients_details_wrapper}>
        <img
          className="mb-4"
          src={ingredient?.image_large}
          alt={ingredient?.name}
        />
        <p className="text text_type_main-medium mb-8">{ingredient?.name}</p>
        <ul className={styles.energy_value_list}>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.calories}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.proteins}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.fat}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.carbohydrates}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
        </ul>
      </div>
    </div>
  );
}
