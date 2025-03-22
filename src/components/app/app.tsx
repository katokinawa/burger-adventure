import { AppHeader } from "../app-header/app-header";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Home } from "../home/home";
import styles from "./app.module.css";
import { Register } from "./pages/register/register";
import { ForgotPassword } from "./pages/forgot-password/forgot-password";
import { ResetPassword } from "./pages/reset-password/reset-password";
import { Profile } from "./pages/profile/profile";
import { ProtectedRouteElement } from "../protected-route";
import { ErrorPage } from "../error-page/error-page";
import IngredientModalHandler from "../ingredient-modal-handler/ingredient-modal-handler";
import OrderModalHandler from "../order-modal-handler/order-modal-handler";
import FeedOrders from "./pages/feed-orders/feed-orders";
import Orders from "./pages/orders/orders";
import { ProfileForm } from "./pages/profile-form/profile-form";
import OrderCurrentModalHandler from "../order-current-modal-handler/order-current-modal-handler";

export default function App() {
  return (
    <HashRouter>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/feed" element={<FeedOrders />}>
            <Route
              path=":orderCurrentId"
              element={<OrderCurrentModalHandler />}
            />
          </Route>

          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          >
            <Route index element={<ProfileForm />} />
            <Route
              path="orders"
              element={<ProtectedRouteElement element={<Orders />} />}
            >
              <Route
                path=":orderCurrentId"
                element={
                  <ProtectedRouteElement
                    element={<OrderCurrentModalHandler />}
                  />
                }
              />
            </Route>
          </Route>

          <Route path="/" element={<Home />}>
            <Route
              path="ingredient/:ingredientId"
              element={<IngredientModalHandler />}
            />
            <Route path="order" element={<OrderModalHandler />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
