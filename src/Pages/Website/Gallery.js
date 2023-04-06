import { useEffect, useState } from "react";
import LoadingWebsite from "../../Components/Loading/LoadingWebsite";
import { baseUrl } from "./../../Api/Api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import "yet-another-react-lightbox/styles.css";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [galleryDescription, setGalleryDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [sketleton, setSketleton] = useState(true);

  const [open, setOpen] = useState(false);

  const images = gallery.map((img) => ({ src: img.images, key: img.id }));
  const [selectedIndex, setSelectedIndex] = useState(0); // new state variable

  // Services Content

  useEffect(() => {
    fetch(`${baseUrl}/gallery`)
      .then((res) => res.json())
      .then((data) => setGallery(data))
      .finally(() => setSketleton(false));
  }, []);

  //   Service Description
  useEffect(() => {
    fetch(`${baseUrl}/gallery-description`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryDescription(data[0].description);
      })
      .finally(setLoading(false));
  }, []);

  // Render Gallery Images

  const showGalleryImages = gallery.map((img, key) => {
    if (
      img.images.endsWith(".jpg") ||
      img.images.endsWith(".jpeg") ||
      img.images.endsWith(".png")
    ) {
      // Image file
      return (
        <div className="col" key={key}>
          <div
            style={{
              backgroundImage: `url(${img.images})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              height: "200px",
              cursor: "pointer",
            }}
            className="gallery-img"
            onClick={() => {
              setOpen(true);
              setSelectedIndex(key);
            }}
          ></div>
        </div>
      );
    } else if (
      img.images.endsWith(".mp4") ||
      img.images.endsWith(".avi") ||
      img.images.endsWith(".mov")
    ) {
      // Video file
      return (
        <div className="col" key={key} style={{ position: "relative" }}>
          <video
            src={img.images}
            onClick={() => setOpen(true)}
            className="gallery-img"
            style={{ width: "100%", height: "200px", cursor: "pointer" }}
            controls
          />
        </div>
      );
    } else {
      // Unknown file type
      return null; // or you can render an error message or do something else
    }
  });

  return (
    <div className="container-sm container-fluid">
      {loading ? (
        <LoadingWebsite />
      ) : (
        <section className="mt-5" style={{ minHeight: "80vh" }}>
          {open && (
            <Lightbox
              open={open}
              onClick={() => setOpen(false)}
              close={() => setOpen(false)}
              slides={images}
              plugins={[Fullscreen, Slideshow]}
            />
          )}
          <h1 className="text-center mb-3 fw-bold position-relative custom-line-2">
            المعرض
          </h1>
          <p className="text-center fw-bold se-color">{galleryDescription}</p>
          <div className="mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3">
            {sketleton ? (
              <>
                <Skeleton className="col" height={200} />
                <Skeleton className="col" height={200} />
                <Skeleton className="col" height={200} />
                <Skeleton className="col" height={200} />
                <Skeleton className="col" height={200} />
              </>
            ) : (
              showGalleryImages
            )}
          </div>
        </section>
      )}
    </div>
  );
}
