import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "./../../Api/Api";
import "./Footer.css";

export default function Footer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [social, setSocial] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    phone: "",
    email: "",
    location: "",
  });

  //   Get Title And Desc
  useEffect(() => {
    fetch(`${baseUrl}/homeA`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data[0].title);
        setDescription(data[0].description);
      });
  }, []);

  //   Get Footer Content

  useEffect(() => {
    fetch(`${baseUrl}/footer`)
      .then((res) => res.json())
      .then((data) => {
        setSocial({
          facebook: data[0].facebook,
          instagram: data[0].instagram,
          youtube: data[0].youtube,
          twitter: data[0].twitter,
          phone: data[0].phone,
          email: data[0].email,
          location: data[0].location,
        });
      });
  }, []);

  return (
    <footer className="text-white mt-5">
      <div className="container-md container-fluid p-4">
        <section>
          <div className="row justify-content-between">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase fw-bold">{title}</h5>
              <p
                className="fw-normal"
                style={{ fontSize: "13px", lineHeight: "1.8" }}
              >
                {description}
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <div className="d-flex flex-column align-items-lg-end justify-content-center">
                <h5 className="text-uppercase">ابقى على اتصال</h5>
                <ul className="list-unstyled pe-0 mb-0">
                  <li>
                    <a href={social.facebook} className="text-white">
                      <i className="fa-brands fa-facebook"></i>
                      <span> صفحة الفيسبوك</span>
                    </a>
                  </li>
                  <li>
                    <a href={social.instagram} className="text-white">
                      <i className="fa-brands fa-instagram"></i>
                      <span> صفحة الانستغرام</span>
                    </a>
                  </li>
                  <li>
                    <a href={social.youtube} className="text-white">
                      <i className="fa-brands fa-youtube"></i>
                      <span> قناتنا على اليويتوب</span>
                    </a>
                  </li>
                  <li>
                    <a href={social.twitter} className="text-white">
                      <i className="fa-brands fa-twitter"></i>
                      <span> صفحتنا على تويتر </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <div className="d-flex flex-column justify-content-center align-items-lg-end">
                <ul className="list-unstyled pe-0 mb-0">
                  <h5 className="text-uppercase">اتصل بنا</h5>
                  <li className=" pb-1">
                    <a href="#" className="text-white">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{social.location}</span>
                    </a>
                  </li>
                  <li className=" pb-1 ">
                    <a href={social.phone} className="text-white">
                      <i className="fa-solid fa-phone"></i>
                      <span>{social.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${social.email}`} className="text-white">
                      <i className="fa-solid fa-envelope"></i>
                      <span>{social.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </section>
        {/* Section: Links */}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div
        dir="ltr"
        className="text-left p-3 sec-footer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="container-md container-fluid">
          <span>@2023 All Rights reserved</span>
          <span> | </span>
          <span className="text-white">
            Designed and developed by <a href="#"> UP2MEDIA</a>
          </span>
        </div>
      </div>
      {/* Copyright */}
    </footer>
  );
}
