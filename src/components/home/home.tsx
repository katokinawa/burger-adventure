import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router";

export function Home() {
  const location = useLocation();
  const isModal: { background: boolean } = location.state?.background ?? false;
  const isIngredientDetailRoute = location.pathname.startsWith("/ingredient/");
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Outlet />
        {!isIngredientDetailRoute || isModal ? (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        ) : null}
      </DndProvider>
    </>
  );
}
