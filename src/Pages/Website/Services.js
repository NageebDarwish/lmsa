import { useEffect, useState } from "react";
import { baseUrl } from "./../../Api/Api";

export default function ServicesPage() {
  const [services, setSevices] = useState([]);
  const [servicesDescription, setServicesDescription] = useState("");
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
      });
  }, []);

  // Render Services

  const showServices = services.map((item, key) => (
    <div
      key={key}
      className="d-flex align-items-stretch text-center col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <div className="custom-box-shadow bg-white p-3">
        <img src={item.icon} alt="icon" width="60px" />
        <h3 className="fw-bold">{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  ));

  return (
    <div className="container-sm container-fluid">
      <section className="mt-5" style={{ minHeight: "80vh" }}>
        <h1 className="text-center mb-3 fw-bold position-relative custom-line-2">
          خدماتنا
        </h1>
        <p className="text-center fw-bold se-color">{servicesDescription}</p>
        <div className="row mt-5 gy-3">{showServices}</div>
      </section>
    </div>
  );
}
