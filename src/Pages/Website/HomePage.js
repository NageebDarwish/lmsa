import { useEffect, useState } from "react";
import LoadingWebsite from "../../Components/Loading/LoadingWebsite";
import { baseUrl } from "./../../Api/Api";
import "./website.css";

export default function HomePage() {
  const [homePage, setHomePage] = useState({
    title: "",
    description: "",
    image: "",
    about_desc: "",
    about_image: "",
  });

  const [bestServices, setBestServices] = useState([]);
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

  // Services Content

  useEffect(() => {
    fetch(`${baseUrl}/services`)
      .then((res) => res.json())
      .then((data) => setBestServices(data.filter((best) => best.best === 1)));
  }, []);

  // Render Best Services

  const showServices = bestServices.map((item, key) => (
    <div key={key} className="col-12 col-sm-6 col-md-3 my-2">
      <div style={{ height: "60px" }} className="mb-3">
        <img src={item.icon} alt="icon" width="60px" />
      </div>
      <h3 className="fw-bold">{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ));

  return (
    <div className="container-sm container-fluid">
      {loading ? (
        <LoadingWebsite />
      ) : (
        <>
          <section className="d-flex align-items-center justify-content-between home-page flex-wrap mt-5">
            <div className="col-md-6 col-12">
              <h1 className="fw-bold pb-3">{homePage.title}</h1>
              <p>{homePage.description}</p>
              <a href="#about" className="custom-an">
                <button className="btn btn-custom d-flex align-items-center justify-content-evenly">
                  <i className="fa-solid fa-arrow-down"></i>{" "}
                  <span>تعرف علينا</span>
                </button>
              </a>
            </div>
            <div className="col-md-6 col-12 text-center">
              <img className="img-fluid" src={homePage.image} alt="Home Page" />
            </div>
          </section>

          {/* Best Services */}
          <section className="mt-5">
            <h1 className="text-center fw-bold">أفضل خدماتنا</h1>
            <div className="d-flex align-items-center justify-content-between text-center flex-wrap mt-5 gap-md-5">
              {showServices}
            </div>
          </section>

          {/* About Section */}
          <h1 className="fw-bold mt-5 text-center">من نحن</h1>
          <section
            id="about"
            className="mt-5 d-flex align-items-center justify-content-between home-page flex-wrap mt-5"
          >
            <div className="col-md-6 col-12 text-center">
              <img
                src={homePage.about_image}
                alt="Home Page"
                className="ps-sm-5 pb-3"
              />
            </div>
            <div className="col-md-6 col-12">
              <h1 className="fw-bold pb-3">{homePage.title}</h1>
              <p className="fw-bold" style={{ color: "#363636" }}>
                {homePage.about_desc}
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
