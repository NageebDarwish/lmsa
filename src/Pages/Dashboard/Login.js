import { useContext, useState } from "react";
import "./logIn.css";
import axios from "axios";
import { baseUrl } from "./../../Api/Api";
import { User } from "./../../Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userNow = useContext(User);
  // Handle Submit
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/login`, {
        email: email,
        password: password,
      });
      setErr(false);
      const Token = res.data.data.token;
      const cookies = new Cookies();
      cookies.set("Bearer", Token, { path: "/" });
      const userDetails = res.data.data.user;
      userNow.setAuth({ Token, userDetails });
      Navigate(from, { replace: true });
      setErr(false);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        setErr("خطأ في كلمة المرور , أو البريد الإلكتروني");
      } else {
        setErr("خطأ في استجابة السيرفر");
      }
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={Submit}>
            <input
              type="text"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">تسجيل الدخول</button>
            {err && (
              <div className="alert alert-danger mt-2" role="alert">
                {err}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
