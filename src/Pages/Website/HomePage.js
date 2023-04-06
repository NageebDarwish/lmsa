import { useEffect, useState } from "react";
import LoadingWebsite from "../../Components/Loading/LoadingWebsite";
import { baseUrl } from "./../../Api/Api";
import "./website.css";
import { Link } from "react-router-dom";
import Services from "../../Components/Website/Services";

export default function HomePage() {
  const [homePage, setHomePage] = useState({
    title: "",
    description: "",
    image: "",
    about_desc: "",
    about_image: "",
  });

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
                <div className="col-md-6 col-12 d-flex  justify-content-between flex-column h-100">
                  <div className="h-75">
                    <h1
                      className="fw-bold pb-3"
                      style={{ color: "var(--primary-color)" }}
                    >
                      عن شركتنا
                    </h1>
                    <p
                      className="custom-about"
                      style={{
                        fontWeight: "500",
                        color: "#363636",
                        lineHeight: "2",
                        height: "70%",
                        overflow: "hidden",
                      }}
                    >
                      {homePage.about_desc.substring(0, 500)}...
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/about"
                      className="btn btn-blue my-3"
                      style={{ width: "50%" }}
                    >
                      معرفة المزيد
                    </Link>
                  </div>
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
                <Services Best={true} />
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
