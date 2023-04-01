import { useEffect } from "react";
import { useState } from "react";
import { baseUrl } from "../../Api/Api";

export default function ContactUsPage() {
  const [contactDescrption, setContactDescription] = useState("");

  const [mapShow, setMapShow] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //   Handle Form Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //   Get Contact Description Data
  useEffect(() => {
    fetch(`${baseUrl}/contact`)
      .then((res) => res.json())
      .then((data) => {
        setContactDescription(data[0].desc);
        setEmail(data[0].email);
        setLocation(data[0].website);
        setPhone(data[0].phone);
      });
  }, []);

  //   Map
  useEffect(() => {
    fetch(`${baseUrl}/map`)
      .then((res) => res.json())
      .then((data) => {
        setMapShow(data);
      });
  }, []);

  const MapShowOnPage = mapShow.map((m, index) => (
    <div key={index}>
      <iframe
        src={m.url}
        width="100%"
        height={"450px"}
        style={{ border: 0, borderRadius: "22px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  ));

  return (
    <div className="container-md container-fluid">
      <section
        className="mt-5 contact d-flex flex-wrap align-items-center justify-content-between"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-12 col-md-6">
          <h1 className="mb-3 fw-bold position-relative custom-line">
            اتصل بنا
          </h1>
          <p className="fw-bold se-color">{contactDescrption}</p>

          <input
            type="text"
            name="name"
            className="form-control p-3 mb-3"
            value={form.name}
            onChange={handleChange}
            placeholder="الاسم الكامل..."
          />
          <input
            type="text"
            name="email"
            className="form-control p-3 mb-3"
            value={form.email}
            onChange={handleChange}
            placeholder="البريد الالكتروني او رقم الهاتف..."
          />
          <textarea
            name="message"
            className="form-control p-3 mb-3"
            value={form.message}
            onChange={handleChange}
            placeholder="الرسالة..."
            rows="7"
          />
        </div>
        <div className="col-md-5 col-12">{MapShowOnPage}</div>
      </section>
      <section className="my-3 d-flex align-items-center flex-wrap justify-content-between">
        <div className="col-12 col-md-6 col-lg-4 flex-column flex-md-row d-flex align-items-center justify-content-start">
          <img src={require("../../Asset/Layer_17.png")} alt="email" />
          <div>
            <h4 className="fw-bold me-3 text-md-end text-center mt-md-0 my-2">
              موقعنا
            </h4>
            <p className="fw-normal me-3 custom-opacity">{location}</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 flex-column flex-md-row d-flex align-items-center justify-content-start">
          <img src={require("../../Asset/Expanded.png")} alt="email" />
          <div>
            <h4 className="fw-bold me-3 mt-md-0 my-2">البريد الالكتروني</h4>
            <p className="fw-normal me-3 custom-opacity">{email}</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 flex-column flex-md-row d-flex align-items-center justify-content-start">
          <img src={require("../../Asset/Call Sales.png")} alt="email" />
          <div>
            <h4 className="fw-bold me-3 mt-md-0 my-2">رقم الهاتف</h4>
            <p className="fw-normal me-3 custom-opacity">{phone}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
