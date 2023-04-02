import "./homePage.css";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import axios from "axios";
import { User } from "../../Context/UserContext";
import LoadingSubmit from "../../Components/Loading/LoadingSubmit";

export default function DashHomePage() {
  const [homePage, setHomePage] = useState({
    title: "",
    description: "",
    about_desc: "",
    image: "",
    about_image: "",
  });

  const [loading, setLoading] = useState(false);

  const [accept, setAccept] = useState(false);
  const { auth } = useContext(User);
  const errMessage = <span className="err">هذا الحقل مطلوب</span>;
  // Get Data

  useEffect(() => {
    fetch(`${baseUrl}/homeA`)
      .then((res) => res.json())
      .then((res) => {
        setHomePage({
          title: res[0].title,
          description: res[0].description,
          about_desc: res[0].about_desc,
          image: "",
          about_image: "",
        });
        setAccept(true);
      });
  }, []);

  // Handle Change

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHomePage((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("image", homePage.image);
      formData.append("about_image", homePage.about_image);
      formData.append("title", homePage.title);
      formData.append("description", homePage.description);
      formData.append("about_desc", homePage.about_desc);
      const res = await axios.post(`${baseUrl}/homeA/update/1`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + String(auth.Token),
        },
      });
      if (res.status === 200) {
        window.location.pathname = "/dashboard/home";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // Hanle Err
  return (
    <>
      {loading && <LoadingSubmit />}
      <section className="m-4 w-100">
        <h3 className="mb-4 position-relative custom-line">
          تعديل معلومات الصفحة الرئيسية
        </h3>
        <form className="row gap-4" onSubmit={handleSubmit} noValidate>
          <div className="col-12 col-lg">
            <div
              className="bg-white col-12 h-100"
              style={{ borderRadius: "12px", padding: "20px" }}
            >
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  العنوان الرئيسي
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={homePage.title}
                  onChange={handleChange}
                  id="exampleFormControlInput1"
                  placeholder="العنوان الرئيسي..."
                />
                {homePage.title === "" && accept && errMessage}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className=" form-label"
                >
                  وصف الشركة
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  name="description"
                  onChange={handleChange}
                  value={homePage.description}
                  rows={3}
                />
                {homePage.description === "" && accept && errMessage}
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  اختر صورة جديدة
                </label>
                <input
                  name="image"
                  className="form-control"
                  onChange={(e) =>
                    setHomePage((prev) => {
                      return { ...prev, image: e.target.files.item(0) };
                    })
                  }
                  type="file"
                  id="formFile"
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg">
            <div
              className="bg-white col-12 h-100"
              style={{ borderRadius: "12px", padding: "20px" }}
            >
              <h4>من نحن</h4>
              <p className="se-color">
                هذه المعلومات ستعرض في نهاية الصفحة الرئيسية
              </p>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea2"
                  className="form-label"
                >
                  وصف الشركة
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea2"
                  name="about_desc"
                  value={homePage.about_desc}
                  onChange={handleChange}
                  rows={3}
                />
                {homePage.about_desc === "" && accept && errMessage}
                <div className="mt-3">
                  <label htmlFor="formFile" className="form-label">
                    اختر صورة جديدة
                  </label>
                  <input
                    onChange={(e) =>
                      setHomePage((prev) => {
                        return { ...prev, about_image: e.target.files.item(0) };
                      })
                    }
                    name="about_image"
                    className="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <button
              type="submit"
              disabled={
                homePage.title === "" ||
                homePage.about_desc === "" ||
                homePage.description === ""
              }
              className="btn btn-primary w-auto"
            >
              تعديل
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
