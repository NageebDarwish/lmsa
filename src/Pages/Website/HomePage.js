import { useEffect, useState } from "react";
import LoadingWebsite from "../../Components/Loading/LoadingWebsite";
import { baseUrl } from "./../../Api/Api";
import "./website.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [homePage, setHomePage] = useState({
    title: "",
    description: "",
    image: "",
    about_desc: "",
    about_image: "",
  });

  const [bestServices, setBestServices] = useState([]);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);

  // Home Page Content
  useEffect(() => {
    fetch(`${baseUrl}/homeA`)
      .then((res) => res.json())
      .then((data) => {
        return setHomePage({
          title: data[0].title,
          description: data[0].description,
          image: data[0].image,
          about_desc: data[0].about_desc,
          about_image: data[0].about_image,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  // Get Number

  useEffect(() => {
    fetch(`${baseUrl}/footer`)
      .then((res) => res.json())
      .then((data) => {
        setNumber(data[0].phone);
      });
  }, []);

  // Services Content

  useEffect(() => {
    fetch(`${baseUrl}/services`)
      .then((res) => res.json())
      .then((data) => setBestServices(data.filter((best) => best.best === 1)));
  }, []);

  // Render Best Services

  const showServices = bestServices.map((item, key) => (
    <div
      key={key}
      className="col-12 col-sm-6 col-md-3 my-2 bg-white py-5 px-2 custom-service-card"
      style={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "22px",
      }}
    >
      <div className="d-flex align-items-center justify-content-between flex-column h-100">
        <div>
          <div className="mb-4">
            <img src={item.icon} alt="icon" width="100px" />
          </div>
          <h3 className="fw-bold mb-4" style={{ fontSize: "22px" }}>
            {item.title}
          </h3>
          <p>{item.description}</p>
        </div>
        <a
          href={`https://wa.me/${number}/?text=أريد طلب خدمة ${item.title}`}
          rel="noreferrer"
          target="_blank"
          className="btn btn-blue mt-2"
        >
          طلب الخدمة
        </a>
      </div>
    </div>
  ));

  return (
    <div style={{ background: "#F1F3FF" }}>
      {loading ? (
        <LoadingWebsite />
      ) : (
        <>
          <div className="container-sm container-fluid pt-5">
            <section className="d-flex align-items-center justify-content-between home-page flex-wrap ">
              <div className="col-md-6 col-12">
                <h1 className="fw-bold pb-3">{homePage.title}</h1>
                <h5 className="w-75 mb-4 lh-lg ">{homePage.description}</h5>
                <a href="#services" className="custom-an">
                  <button
                    className="btn btn-custom d-flex align-items-center justify-content-around w-50 py-3"
                    style={{ borderRadius: "200px" }}
                  >
                    <span>خدماتنا</span>
                    <img
                      src={require("../../Asset/serviceIcon.png")}
                      alt="icon"
                    />
                  </button>
                </a>
                <div className="d-flex align-items-center justify-content-start mt-4">
                  <div
                    className="ms-2"
                    style={{
                      backgroundColor: "#63D1E0",
                      borderRadius: "50%",
                      padding: "15px",
                    }}
                  >
                    <img src={require("../../Asset/phone.png")} alt="phone" />
                  </div>
                  <div style={{ alignSelf: "flex-end" }}>
                    <p
                      style={{
                        fontSize: "13px",
                        marginBottom: "6px",
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      اتصل بنا الآن
                    </p>
                    <p className="text-black fw-bold mb-0">{number}</p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 col-12 text-center"
                style={{ alignSelf: "end" }}
              >
                <img
                  className="img-fluid"
                  src={homePage.image}
                  alt="Home Page"
                />
              </div>
            </section>
          </div>

          {/* About Section */}
          <div className="bg-grey-2">
            <div className="container-sm container-fluid pt-5">
              <section
                id="about"
                className="mt-5 d-flex align-items-start justify-content-between home-page flex-wrap mt-5"
              >
                <div className="col-md-6 col-12 text-center">
                  <img
                    src={homePage.about_image}
                    alt="Home Page"
                    className="ps-sm-5 pb-3"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <h1
                    className="fw-bold pb-3"
                    style={{ color: "var(--primary-color)" }}
                  >
                    عن شركتنا
                  </h1>
                  <p
                    style={{
                      fontWeight: "500",
                      color: "#363636",
                      lineHeight: "2",
                    }}
                  >
                    {homePage.about_desc}
                  </p>
                  <Link
                    to="/about"
                    className="btn btn-blue mt-2"
                    style={{ width: "50%" }}
                  >
                    معرفة المزيد
                  </Link>
                </div>
              </section>
            </div>
          </div>
          {/* Best Services */}
          <div className="bg-grey-2">
            <div className="container-sm container-fluid">
              <section className="pt-5" id="services">
                <h1
                  className="text-center fw-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  خدماتنا
                </h1>
                <div className="d-flex align-items-stretch justify-content-between text-center flex-wrap mt-5 gap-md-5">
                  {showServices}
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
