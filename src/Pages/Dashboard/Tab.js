import "./homePage.css";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import axios from "axios";
import { User } from "../../Context/UserContext";

export default function Tab() {
  const [tab, setTab] = useState({
    title: "",

    icon: "",
    logo: "",
  });

  const [accept, setAccept] = useState(false);
  const { auth } = useContext(User);
  const errMessage = <span className="err">هذا الحقل مطلوب</span>;
  // Get Data

  useEffect(() => {
    fetch(`${baseUrl}/tab/`)
      .then((res) => res.json())
      .then((res) => {
        setTab({
          title: res[0].title,
          icon: "",
          logo: "",
        });
        setAccept(true);
      });
  }, []);

  // Handle Change

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTab((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("icon", tab.icon);
      formData.append("logo", tab.logo);
      formData.append("title", tab.title);

      const res = await axios.post(`${baseUrl}/tab/1`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + String(auth.Token),
        },
      });
      if (res.status === 200) {
        window.location.pathname = "/dashboard/settings";
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Hanle Err
  return (
    <form className="row gap-4 mb-3" onSubmit={handleSubmit} noValidate>
      <div className="col-12 col-lg">
        <div
          className="bg-white col-12 h-100"
          style={{ borderRadius: "12px", padding: "20px" }}
        >
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              عنوان الموقع
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={tab.title}
              onChange={handleChange}
              id="exampleFormControlInput1"
              placeholder="اسم الشركة..."
            />
            {tab.title === "" && accept && errMessage}
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              شعار الموقع
              <span
                className="fw-normal me-1"
                style={{ opacity: "0.77", fontSize: "12px" }}
              >
                (60x60)
              </span>
            </label>
            <input
              name="logo"
              className="form-control"
              onChange={(e) =>
                setTab((prev) => {
                  return { ...prev, logo: e.target.files.item(0) };
                })
              }
              type="file"
              id="formFile"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="formFile" className="form-label">
              صورة الشعار المصغر
              <span
                className="fw-normal me-1"
                style={{ opacity: "0.77", fontSize: "12px" }}
              >
                (82x82)
              </span>
            </label>
            <input
              onChange={(e) =>
                setTab((prev) => {
                  return { ...prev, icon: e.target.files.item(0) };
                })
              }
              name="icon"
              className="form-control"
              type="file"
              id="formFile"
            />
          </div>
          <button
            type="submit"
            disabled={tab.title === ""}
            className="btn btn-primary w-auto mt-3"
          >
            تعديل
          </button>
        </div>
      </div>
    </form>
  );
}
