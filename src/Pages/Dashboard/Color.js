import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import { User } from "../../Context/UserContext";

export default function Color() {
  const [color, setColor] = useState("#1f1f1f");

  //   Err Msgs
  const [Aceept, setAccept] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //   Get Auth User
  const { auth } = useContext(User);

  //   Get Data

  useEffect(() => {
    fetch(`${baseUrl}/color`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + String(auth.Token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setColor(data[0].color);
      });
  }, []);

  //   Send Data

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        `${baseUrl}/color/update/1`,
        { color: color },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + String(auth.Token),
          },
        }
      );
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
    <form className="mt-3 w-100" onSubmit={handleSubmit}>
      <div className="mt-3">
        <label htmlFor="color" className="form-label">
          اللون الرئيسي للموقع
        </label>
        <input
          type="color"
          name="color"
          className="form-control form-control-color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          id="color"
          placeholder="الاسم ..."
        />
        {color === "" && Aceept && <span className="err">حقل اللون مطلوب</span>}
      </div>

      {errMsg && (
        <div className="alert alert-danger mt-2" role="alert">
          {errMsg}
        </div>
      )}
      <button className="btn btn-primary mt-5">تعديل</button>
    </form>
  );
}
