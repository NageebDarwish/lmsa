import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import { User } from "../../../Context/UserContext";
import "../table.css";

export default function Services() {
  const { auth } = useContext(User);
  const token = auth.Token;

  // Services Description
  const [serviceDescription, setServiceDescription] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  //   Get Service Description
  useEffect(() => {
    fetch(`${baseUrl}/serviceDe`)
      .then((res) => res.json())
      .then((data) => {
        setOldValue(data[0].description);
        setServiceDescription(data[0].description);
      });
  }, []);
  //   Submit Service Description
  async function submitServiceDescription() {
    try {
      await axios.post(
        `${baseUrl}/serviceDe/update/1`,
        { description: serviceDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("تم الحفظ بنجاح");
      setErr(false);
      setOldValue(serviceDescription);
    } catch (err) {
      setSuccess(false);
      if (err.response.status === 401) {
        setErr("خطأ في عملية المصادقة");
      } else if (err.response.status === 422) {
        setErr("يجب ان يحتوي حقل هذه الصفحة على حرف على الأقل!");
      } else {
        setErr("خطأ في الخادم");
      }
    }
  }

  //   Services

  const [services, setServices] = useState([]);
  const [deleteServiceErr, setDeleteServiceErr] = useState(false);

  //   Get Services
  useEffect(() => {
    fetch(`${baseUrl}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const showServices = services.map((service, index) => (
    <tr key={service.id}>
      <td>{index + 1}</td>
      <td>{service.title}</td>
      <td>{service.description}</td>
      <td style={{ display: "flex" }}>
        <Link
          to={`update-service/${service.id}`}
          className="btn btn-primary ms-2"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <button
          onClick={() => handleDelete(service.id)}
          className="btn btn-danger"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  ));

  //   Delete Service
  async function handleDelete(id) {
    try {
      await axios
        .delete(`${baseUrl}/services/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + String(auth.Token),
          },
        })
        .then(setServices(services.filter((service) => service.id !== id)));

      setServices((prev) => prev);
    } catch (err) {
      if (err.response.status === 401) {
        setDeleteServiceErr("خطأ في عملة المصادقة");
      } else {
        setDeleteServiceErr("خدث خطأ يرجى اعادة المحاولة");
      }
    }
  }

  return (
    <section className="m-4 w-100" style={{ overflow: "hidden" }}>
      <h2>تعديل الخدمات</h2>

      <div
        className="bg-white"
        style={{ padding: "20px", borderRadius: "12px" }}
      >
        <label htmlFor="exampleFormControlInput1" className="form-label">
          وصف صفحة الخدمات
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
          id="exampleFormControlInput1"
          placeholder="الوصف..."
        />

        <button
          disabled={oldValue === serviceDescription ? true : false}
          onClick={submitServiceDescription}
          className="btn btn-primary mt-5"
        >
          حفظ التعديلات
        </button>
        {sucess && (
          <div className="alert alert-primary mt-2" role="alert">
            تم الحفظ بنجاح
          </div>
        )}
        {err && (
          <div className="alert alert-danger mt-2" role="alert">
            {err}
          </div>
        )}
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-between">
        <h2>الخدمات</h2>
        <Link to="create-service" className="btn btn-primary">
          <i className="fa-solid fa-plus"></i> انشاء خدمة جديدة
        </Link>
      </div>
      <div className="mt-3" style={{ overflowX: "scroll" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>عنوان الخدمة</th>
              <th>وصف الخدمة</th>
              <th>إدارة الخدمة</th>
            </tr>
          </thead>
          <tbody>{showServices}</tbody>
        </table>
      </div>
      <Link to="create-service" className="btn btn-primary mt-3">
        <i className="fa-solid fa-plus"></i> انشاء خدمة جديدة
      </Link>
    </section>
  );
}
