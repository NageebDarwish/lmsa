import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import { User } from "../../Context/UserContext";

export default function Contact() {
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //   Err Msgs
  const [Aceept, setAccept] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //   Get Auth User
  const { auth } = useContext(User);

  //   Get Data

  useEffect(() => {
    fetch(`${baseUrl}/contact`)
      .then((res) => res.json())
      .then((data) => {
        setDescription(data[0].desc);
        setWebsite(data[0].website);
        setEmail(data[0].email);
        setPhone(data[0].phone);
      });
  }, []);

  //   Send Data

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        `${baseUrl}/contact/update/1`,
        { desc: description, website: website, email: email, phone: phone },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + String(auth.Token),
          },
        }
      );
      window.location.pathname = "/dashboard/contact";
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
      <div
        className="bg-white"
        style={{ padding: "20px", borderRadius: "12px" }}
      >
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mt-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              الوصف
            </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="exampleFormControlInput1"
              placeholder="الوصف ..."
            />
            {description === "" && Aceept && (
              <span className="err">حقل الوصف مطلوب</span>
            )}
          </div>
          <label htmlFor="exampleFormControlInput1" className="form-label mt-2">
            الموقع
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            id="exampleFormControlInput1"
            placeholder="رابط الموقع ..."
          />
          {website === "" && Aceept && (
            <span className="err">حقل رابط الموقع مطلوب</span>
          )}

          <div className="mt-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="description"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleFormControlInput1"
              placeholder="البريد الإلكتروني ..."
            />
            {email === "" && Aceept && (
              <span className="err">حقل البريد الإلكتروني مطلوب</span>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              رقم الهاتف
            </label>
            <input
              type="number"
              name="description"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="exampleFormControlInput1"
              placeholder="رقم الهاتف ..."
            />
            {phone === "" && Aceept && (
              <p className="err">حقل رقم الهاتف مطلوب</p>
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
    </section>
  );
}
