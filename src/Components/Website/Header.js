import { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, NavLink } from "react-router-dom";
import { baseUrl } from "../../Api/Api";

import "./Header.css";

export default function Header() {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/tab`)
      .then((res) => res.json())
      .then((data) => setImage(data[0].logo));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#F1F3FF" }}>
      <div className="container-fluid container-md">
        {image !== "" ? (
          <img
            src={image}
            className="navbar-brand"
            alt="logo"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />
        ) : (
          <Skeleton width={60} height={60} />
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="d-flex align-items-center justify-content-center navbar-nav custom-ul"
            style={{ flex: " 1" }}
          >
            <li>
              <NavLink to="/">الرئيسية</NavLink>
            </li>
            <li>
              <NavLink to="/about">عن شركتنا</NavLink>
            </li>
            <li>
              <NavLink to="/services">خدماتنا</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">المعرض</NavLink>
            </li>
            <li>
              <NavLink to="/contact">اتصل بنا</NavLink>
            </li>
          </ul>
          <Link
            to="/contact"
            className="btn btn-black py-3 px-5 d-block"
            style={{ borderRadius: "13.18px" }}
          >
            اتصل بنا الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
