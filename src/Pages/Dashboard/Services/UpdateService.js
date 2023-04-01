import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../../Api/Api";
import { User } from "../../../Context/UserContext";

export default function UpdateService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [special, setSpecial] = useState(false);

  //   Err Msgs
  const [Aceept, setAccept] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  //   Get Auth User
  const { auth } = useContext(User);
  const id = Number(window.location.pathname.split("/").slice(-1)[0]);

  //   Get Data
  useEffect(() => {
    axios
      .get(`${baseUrl}/services/${id}`, {
        headers: {
          Authorization: "Bearer " + String(auth.Token),
        },
      })
      .then((res) => {
        console.log(res);
        setTitle(res.data[0].title);
        setDescription(res.data[0].description);
        setSpecial(res.data[0].best === 1 ? true : false);
      })
      .catch((err) => console.log(err));
  }, []);

  //   Send Data

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("icon", image);
    formData.append("best", special ? 1 : 0);

    try {
      await axios.post(`${baseUrl}/services/update/${id}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + String(auth.Token),
        },
      });

      window.location.pathname = "/dashboard/services";
    } catch (err) {
      console.log(err);
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
        <div className="mt-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            عنوان الخدمة
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="exampleFormControlInput1"
            placeholder="عنوان الخدمة..."
          />
          {title === "" && Aceept && (
            <span className="err">حقل العنوان مطلوب</span>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            وصف الخدمة
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="exampleFormControlInput1"
            placeholder="وصف الخدمة..."
          />
          {description === "" && Aceept && (
            <span className="err">حقل وصف الخدمة مطلوب</span>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            صورة الخدمة
          </label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files.item(0))}
            id="exampleFormControlInput1"
          />
        </div>
        <div className="form-check mt-3" style={{ width: "fit-content" }}>
          <input
            style={{ float: "right", marginLeft: "10px" }}
            className="form-check-input"
            checked={special}
            type="checkbox"
            onChange={(e) => setSpecial((prev) => !prev)}
            id="flexCheckChecked"
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            جعل الخدمة مميزة
          </label>
        </div>

        {errMsg && (
          <div className="alert alert-danger mt-2" role="alert">
            {errMsg}
          </div>
        )}
        <button onClick={handleSubmit} className="btn btn-primary mt-5">
          تعديل الخدمة
        </button>
      </div>
    </section>
  );
}
