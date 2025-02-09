import { AppHeader } from "../app-header/app-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Orders from "./pages/orders/orders";

export default function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/profile/orders"
            element={<ProtectedRouteElement element={<Orders />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          />
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
    </BrowserRouter>
  );
}
