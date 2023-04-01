import { useEffect, useState } from "react";
import { baseUrl } from "./../../Api/Api";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [galleryDescription, setGalleryDescription] = useState("");
  // Services Content

  useEffect(() => {
    fetch(`${baseUrl}/gallery`)
      .then((res) => res.json())
      .then((data) => setGallery(data));
  }, []);

  //   Service Description
  useEffect(() => {
    fetch(`${baseUrl}/gallery-description`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryDescription(data[0].description);
      });
  }, []);

  // Render Gallery Images

  const showGalleryImages = gallery.map((img, key) => (
    <div className="col" key={key}>
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
      ></div>
    </div>
  ));

  return (
    <div className="container-sm container-fluid">
      <section className="mt-5" style={{ minHeight: "80vh" }}>
        <h1 className="text-center mb-3 fw-bold position-relative custom-line-2">
          المعرض
        </h1>
        <p className="text-center fw-bold se-color">{galleryDescription}</p>
        <div className="mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3">
          {showGalleryImages}
        </div>
      </section>
    </div>
  );
}
