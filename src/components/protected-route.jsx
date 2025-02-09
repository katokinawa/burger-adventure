import { Navigate, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { submitGetPersonValues } from "../services/actions/form";
import { getCookie } from "../utils/getCookieValue";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, anonymous = false }) => {
  const dispatch = useDispatch();
  const token = getCookie().refreshToken;
  const location = useLocation();
  const from = location.state?.from || "/";

  const init = useCallback(() => {
    if (token) {
      dispatch(submitGetPersonValues());
    }
  }, [dispatch, token]);

  useEffect(() => {
    init();
  }, [init]);

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && token) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !token) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
  anonymous: PropTypes.bool,
};
