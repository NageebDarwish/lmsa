import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import { User } from "../../Context/UserContext";
import Color from "./Color";
import Tab from "./Tab";

export default function Settings() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  //   Err Msgs
  const [Aceept, setAccept] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //   Get Auth User
  const { auth } = useContext(User);

  //   Get Data

  useEffect(() => {
    fetch(`${baseUrl}/user`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + String(auth.Token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(() => {
          return {
            name: data.name,
            email: data.email,
            password: "",
            password_confirmation: "",
          };
        });
      });
  }, []);

  //   Handle Change
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  //   Send Data

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/edit`, user, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + String(auth.Token),
        },
      });
      window.location.pathname = "/dashboard/settings";
    } catch (err) {
      setAccept(true);

      if (err.response.status === 401) {
        setErrMsg("خطأ في عملية المصادقة");
      } else if (err.response.status === 422) {
        return null;
      } else {
        setErrMsg("خطأ في استجابة السيرفر");
      }
    }
  }

  return (
    <section className="m-4 w-100">
      <Tab />
      <div
        className="bg-white"
        style={{ padding: "20px", borderRadius: "12px" }}
      >
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="name" className="form-label">
              اسم المستخدم
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={user.name}
              onChange={handleChange}
              id="name"
              placeholder="الاسم ..."
            />
            {user.name === "" && Aceept && (
              <span className="err">حقل الاسم مطلوب</span>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="email" className="form-label">
              البريد الالكتروني
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
              id="email"
              placeholder="البريد الالكتروني ..."
            />
            {user.email === "" && Aceept && (
              <span className="err">حقل البريد الالكتروني مطلوب</span>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="form-label">
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
              id="password"
              placeholder="كلمة المرور الجديدة..."
            />
            {user.password === "" && Aceept && (
              <span className="err">حقل كلمة المرور مطلوب</span>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="password_confirmation" className="form-label">
              تأكيد كلمة المرور الجديدة
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              value={user.password_confirmation}
              onChange={handleChange}
              id="password_confirmation"
              placeholder="تأكيد كلمة المرور الجديدة..."
            />
            {user.password_confirmation === "" && Aceept && (
              <span className="err">حقل تأكيد كلمة المرور مطلوب</span>
            )}
          </div>
          {errMsg && (
            <div className="alert alert-danger mt-2" role="alert">
              {errMsg}
            </div>
          )}
          <button className="btn btn-primary mt-5">تعديل</button>
        </form>
      </div>
      <hr />
      <Color />
    </section>
  );
}
