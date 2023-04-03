import { useEffect, useState } from "react";
import { baseUrl } from "./../../Api/Api";
import LoadingWebsite from "./../../Components/Loading/LoadingWebsite";

export default function ServicesPage() {
  const [services, setSevices] = useState([]);
  const [servicesDescription, setServicesDescription] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);

  // Services Content

  useEffect(() => {
    fetch(`${baseUrl}/services`)
      .then((res) => res.json())
      .then((data) => setSevices(data));
  }, []);

  //   Service Description
  useEffect(() => {
    fetch(`${baseUrl}/serviceDe`)
      .then((res) => res.json())
      .then((data) => {
        setServicesDescription(data[0].description);
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

  // Render Services

  const showServices = services.map((item, key) => (
    <div
      key={key}
      className="col-12 col-sm-6 col-md-4 col-lg-3 my-2 bg-white py-5 px-2 custom-service-card"
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
    <div className="container-sm container-fluid">
      {loading ? (
        <LoadingWebsite />
      ) : (
        <section className="mt-5" style={{ minHeight: "80vh" }}>
          <h1 className="text-center mb-3 fw-bold position-relative custom-line-2">
            خدماتنا
          </h1>
          <p className="text-center fw-bold se-color">{servicesDescription}</p>
          <div className="d-flex align-items-stretch justify-content-between text-center flex-wrap mt-5 gap-md-5">
            {showServices}
          </div>
        </section>
      )}
    </div>
  );
}
