import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "./UserContext";
import { baseUrl } from "./../Api/Api";

export default function AuthRequire() {
  const userLogin = useContext(User);
  const [userObject, setUserObject] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/user`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + String(userLogin.auth.Token),
      },
    })
      .then((res) => res.json())
      .then((data) => setUserObject(data));
  }, []);

  const location = useLocation();

  return userLogin?.auth?.Token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
