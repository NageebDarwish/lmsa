import { useEffect, useState } from "react";
import Services from "../../Components/Website/Services";
import { baseUrl } from "./../../Api/Api";
import LoadingWebsite from "./../../Components/Loading/LoadingWebsite";

export default function ServicesPage() {
  const [servicesDescription, setServicesDescription] = useState("");

  const [loading, setLoading] = useState(true);

  //   Service Description
  useEffect(() => {
    fetch(`${baseUrl}/serviceDe`)
      .then((res) => res.json())
      .then((data) => {
        setServicesDescription(data[0].description);
      })
      .finally(() => setLoading(false));
  }, []);

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
          <Services />
        </section>
      )}
    </div>
  );
}
