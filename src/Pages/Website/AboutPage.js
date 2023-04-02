import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../Api/Api";
import parse from "html-react-parser";
import LoadingWebsite from "./../../Components/Loading/LoadingWebsite";

export default function AboutPage() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${baseUrl}/aboutL`)
      .then((res) => res.json())
      .then((data) => setData(data[0].description))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div
      className="container-md container-fluid my-5"
      style={{ minHeight: "100vh" }}
    >
      {loading ? <LoadingWebsite /> : <>{parse(`${data}`)}</>}
    </div>
  );
}
