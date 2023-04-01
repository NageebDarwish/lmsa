import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseUrl } from "../Api/Api";
import { User } from "../Context/UserContext";

import LoadingScreen from "./Loading/LoadingScreen";

export default function PersistLogin() {
  const [isLoading, setLoading] = useState(true);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const { setAuth } = useContext(User);

  useEffect(() => {
    try {
      setAuth({
        Token: token,
      });
      fetch(`${baseUrl}/user`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAuth({
            Token: token,
            userDetails: data,
          });
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return <>{isLoading ? <LoadingScreen /> : <Outlet />}</>;
}
