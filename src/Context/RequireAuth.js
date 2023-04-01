import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "./UserContext";

export default function AuthRequire() {
  const userLogin = useContext(User);
  console.log(userLogin);
  const location = useLocation();

  return userLogin?.auth?.Token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
