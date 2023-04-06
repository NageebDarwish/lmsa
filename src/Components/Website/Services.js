import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Api/Api";

export default function Services({ Best }) {
  const [services, setSevices] = useState([]);
  const [number, setNumber] = useState("");

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
      .then((data) => {
        Best
          ? setSevices(data.filter((best) => best.best === 1))
          : setSevices(data);
      });
  }, []);
  // Render Services

  const showServices = services.map((item, key) => (
    <div key={key} className="col-12 col-sm-6 col-lg-3 my-2">
      <div
        className="d-flex align-items-center justify-content-between flex-column h-100 bg-white py-5 px-2 mx-2 custom-service-card"
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "22px",
        }}
      >
        <div>
          <div className="mb-4">
            <img src={item.icon} alt="icon" width="100px" />
          </div>
          <h3 className="fw-bold mb-4" style={{ fontSize: "22px" }}>
            {item.title}
          </h3>
          <p>{item.description}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link to={`/service/${item.id}`} className="btn btn-blue mt-2 ms-1">
            معرفة المزيد
          </Link>
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
    </div>
  ));
  return (
    <div className="d-flex align-items-stretch text-center flex-wrap mt-5">
      {showServices}
    </div>
  );
}
