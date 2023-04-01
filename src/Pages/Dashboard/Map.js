import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Api/Api";
import { User } from "../../Context/UserContext";

export default function Map() {
  const [map, setMap] = useState("");
  const [mapShow, setMapShow] = useState([]);

  //   Err Msgs
  const [Aceept, setAccept] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //   Get Auth User
  const { auth } = useContext(User);

  //   Get Data

  useEffect(() => {
    fetch(`${baseUrl}/map`)
      .then((res) => res.json())
      .then((data) => {
        setMap(data[0].url);
        setMapShow(data);
      });
  }, []);

  //   Send Data

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        `${baseUrl}/map/update/1`,
        { url: map },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + String(auth.Token),
          },
        }
      );
      window.location.pathname = "/dashboard/map";
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

  const MapShowOnPage = mapShow.map((m, index) => (
    <div className="mt-2" key={index}>
      <iframe
        src={m.url}
        width="100%"
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  ));
  return (
    <section className="m-4 w-100">
      <div
        className="bg-white"
        style={{ padding: "20px", borderRadius: "12px" }}
      >
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mt-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              رابط الموقع على خرائط غوغل
            </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={map}
              onChange={(e) => setMap(e.target.value)}
              id="exampleFormControlInput1"
              placeholder="الوصف ..."
            />
            {map === "" && Aceept && (
              <span className="err">حقل الرابط مطلوب</span>
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
      <h2>الخريطة الحالية</h2>
      {MapShowOnPage}
    </section>
  );
}
