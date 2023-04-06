import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Lightbox from "yet-another-react-lightbox";
import { baseUrl } from "../../Api/Api";
import LoadingWebsite from "../../Components/Loading/LoadingWebsite";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

export default function Service() {
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState([]);
  const [title, setTitle] = useState("");
  const [serviceImages, setServiceImages] = useState([]);
  const [sketleton, setSketleton] = useState(true);
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // new state variable

  const images = serviceImages.map((img) => ({ src: img.image }));

  const id = Number(window.location.pathname.split("/").slice(-1)[0]);

  // Get Number

  useEffect(() => {
    fetch(`${baseUrl}/footer`)
      .then((res) => res.json())
      .then((data) => {
        setNumber(data[0].phone);
      });
  }, []);

  //   Get Service

  useEffect(() => {
    fetch(`${baseUrl}/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setTitle(data[0].title);
      })
      .finally(() => setLoading(false));
  }, []);

  //   Get Service Images
  useEffect(() => {
    fetch(`${baseUrl}/service-img`)
      .then((res) => res.json())
      .then((data) => {
        setServiceImages(data.filter((img) => img.service_id === id));
      })

      .finally(() => setSketleton(false));
  }, []);

  //   Render Service
  const showService = service.map((item, key) => (
    <div key={key}>
      <h1 className="text-center">{item.title}</h1>
      <p className="mt-4">{item.description}</p>
    </div>
  ));

  //   Render Images
  const showServiceImags = serviceImages.map((img, index) => {
    // Image file
    return (
      <div className="col" key={index}>
        <div
          style={{
            backgroundImage: `url(${img.image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: "200px",
            cursor: "pointer",
          }}
          className="gallery-img"
          onClick={() => {
            setSelectedIndex(index);
            setOpen(true);
          }}
        ></div>
      </div>
    );
  });

  return (
    <div className="container-sm container-fluid" style={{ minHeight: "80vh" }}>
      {loading ? (
        <LoadingWebsite />
      ) : (
        <>
          <div className="my-3">{showService}</div>
          {open && (
            <Lightbox
              open={open}
              onClick={() => setOpen(false)}
              close={() => setOpen(false)}
              slides={images}
              index={selectedIndex}
              plugins={[Fullscreen, Slideshow]}
            />
          )}
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
              showServiceImags
            )}
          </div>
          <div style={{ width: "40%", margin: "0 auto" }}>
            <a
              href={`https://wa.me/${number}/?text=أريد طلب خدمة ${title}`}
              rel="noreferrer"
              target="_blank"
              className="btn btn-blue mt-5"
            >
              طلب الخدمة
            </a>
          </div>
        </>
      )}
    </div>
  );
}
