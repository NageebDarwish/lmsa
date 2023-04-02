import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/LoadingSubmit";
import { User } from "../../Context/UserContext";

export default function Footer() {
  const [description, setDescription] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  // Loading

  const [loading, setLoading] = useState(false);

  //   Err Msgs
  const [Aceept, setAccept] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //   Get Auth User
  const { auth } = useContext(User);

  //   Get Data

  useEffect(() => {
    fetch(`${baseUrl}/footer`)
      .then((res) => res.json())
      .then((data) => {
        setDescription(data[0].description);
        setFacebook(data[0].facebook);
        setYoutube(data[0].youtube);
        setInstagram(data[0].instagram);
        setTwitter(data[0].twitter);

        setEmail(data[0].email);
        setPhone(data[0].phone);
        setLocation(data[0].location);
      });
  }, []);

  //   Send Data

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${baseUrl}/footer/update/1`,
        {
          description: description,
          facebook: facebook,
          youtube: youtube,
          instagram: instagram,
          twitter: twitter,

          email: email,
          phone: phone,
          location: location,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + String(auth.Token),
          },
        }
      );
      window.location.pathname = "/dashboard/footer";
    } catch (err) {
      setAccept(true);
      console.log(err);
      if (err.response.status === 401) {
        setErrMsg("خطأ في عملية المصادقة");
      } else if (err.response.status === 422) {
        return null;
      } else {
        setErrMsg("خطأ في استجابة السيرفر");
      }
    } finally {
      setLoading(true);
    }
  }
  return (
    <>
      {loading && <LoadingSubmit />}
      <section className="m-4 w-100">
        <h3 className="mb-4 position-relative custom-line">
          تعديل معلومات نهاية الصفحة
        </h3>
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
            <div className="mt-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                رابط حساب اليوتيوب
              </label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                id="exampleFormControlInput1"
                placeholder="رابط حساب اليوتيوب ..."
              />
              {youtube === "" && Aceept && (
                <span className="err">حقل الرابط مطلوب</span>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                رابط حساب الفيسبوك
              </label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                id="exampleFormControlInput1"
                placeholder="رابط حساب الفيسبوك ..."
              />
              {facebook === "" && Aceept && (
                <span className="err">حقل الرابط مطلوب</span>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                رابط حساب الانستغرام
              </label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                id="exampleFormControlInput1"
                placeholder="رابط حساب الفيسبوك ..."
              />
              {instagram === "" && Aceept && (
                <span className="err">حقل الرابط مطلوب</span>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                رابط حساب التويتر
              </label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                id="exampleFormControlInput1"
                placeholder="رابط حساب التويتر ..."
              />
              {twitter === "" && Aceept && (
                <span className="err">حقل الرابط مطلوب</span>
              )}
            </div>

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

            <div className="mt-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                الموقع
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                id="exampleFormControlInput1"
                placeholder="الموقع ..."
              />
              {phone === "" && Aceept && (
                <p className="err">حقل الموقع مطلوب</p>
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
    </>
  );
}
