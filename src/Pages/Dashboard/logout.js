import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../../Api/Api";
import { User } from "../../Context/UserContext";
import Cookies from "universal-cookie";

export default function Logout() {
  // Get Token
  const { auth } = useContext(User);
  const cookie = new Cookies();
  async function logout() {
    try {
      await axios.post(`${baseUrl}/logout`, null, {
        headers: {
          Authorization: "Bearer " + String(auth.Token),
        },
      });
      cookie.remove("Bearer");
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }
  logout();
}
