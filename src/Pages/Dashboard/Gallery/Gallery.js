import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/LoadingSubmit";
import { User } from "../../../Context/UserContext";
import "./gallery.css";

export default function Gallery() {
  const { auth } = useContext(User);
  const token = auth.Token;
  const [loading, setLoading] = useState(false);

  // Gallery Description
  const [galleryDescription, setGalleryDescription] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  //   Get Gallery Description
  useEffect(() => {
    fetch(`${baseUrl}/gallery-description`)
      .then((res) => res.json())
      .then((data) => {
        setOldValue(data[0].description);
        setGalleryDescription(data[0].description);
      });
  }, []);
  //   Submit Gallery Description
  async function submitGalleryDescription() {
    try {
      await axios.patch(
        `${baseUrl}/gallery-description/1`,
        { description: galleryDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("تم الحفظ بنجاح");
      setErr(false);
      setOldValue(galleryDescription);
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

  //   Gallery Images

  const [galleryImages, setGalleryImages] = useState([]);
  const [images, setImages] = useState([]);
  const [deleteServiceErr, setDeleteServiceErr] = useState(false);

  //   Get Gallery Images
  useEffect(() => {
    fetch(`${baseUrl}/gallery`)
      .then((res) => res.json())
      .then((data) => setGalleryImages(data));
  }, []);

  const showGalleryImages = galleryImages.map((img, index) => (
    <div className="col" key={index} style={{ position: "relative" }}>
      <div
        style={{
          backgroundImage: `url(${img.images})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "200px",
        }}
        className="gallery-img"
      >
        <div
          onClick={() => handleDelete(img.id)}
          style={{ position: "absolute", top: "-6px", right: "-5px" }}
        >
          <i
            className="fa-solid fa-circle-xmark"
            style={{
              borderRadius: "50%",
              backgroundColor: "white",
              border: "4px solid white",
              color: "red",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>
    </div>
  ));

  // Upload New Images
  const ImageUploaderHandler = async (e) => {
    setLoading(true);
    const uploadedImages = Array.from(e.target.files);
    setImages([...images, ...uploadedImages]);
    const formData = new FormData();
    uploadedImages.forEach((image_file) => {
      formData.append("images[]", image_file);
    });

    try {
      await axios.post(`${baseUrl}/gallery`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + String(auth.Token),
        },
      });
      window.location.pathname = "/dashboard/gallery";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Gallery Image
  async function handleDelete(id) {
    try {
      await axios
        .delete(`${baseUrl}/gallery/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + String(auth.Token),
          },
        })
        .then(
          setGalleryImages(galleryImages.filter((service) => service.id !== id))
        );
      setGalleryImages((prev) => prev);
    } catch (err) {
      if (err.response.status === 401) {
        setDeleteServiceErr("خطأ في عملة المصادقة");
      } else {
        setDeleteServiceErr("خدث خطأ يرجى اعادة المحاولة");
      }
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <section className="m-4 w-100">
        <h2>تعديل معلومات المعرض</h2>

        <div
          className="bg-white"
          style={{ padding: "20px", borderRadius: "12px" }}
        >
          <label htmlFor="exampleFormControlInput1" className="form-label">
            وصف صفحة المعرض
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={galleryDescription}
            onChange={(e) => setGalleryDescription(e.target.value)}
            id="exampleFormControlInput1"
            placeholder="الوصف..."
          />

          <button
            disabled={oldValue === galleryDescription ? true : false}
            onClick={submitGalleryDescription}
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
          <h2>صور المعرض</h2>
          <label htmlFor="formFile" className="form-label btn btn-primary">
            <i className="fa-solid fa-plus"></i> رفع صور جديدة
          </label>
          <input
            className="form-control custom-input"
            id="formFile"
            type="file"
            multiple
            onChange={ImageUploaderHandler}
          />
        </div>
        <div className="mt-3 row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {showGalleryImages}
        </div>
        <label htmlFor="formFile" className="form-label btn btn-primary mt-3">
          <i className="fa-solid fa-plus"></i> رفع صور جديدة
        </label>
      </section>
    </>
  );
}
