import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../Api/Api";
import parse from "html-react-parser";

export default function AboutPage() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(`${baseUrl}/aboutL`)
      .then((res) => res.json())
      .then((data) => setData(data[0].description));
  }, []);
  return (
    <div
      className="container-md container-fluid my-5"
      style={{ minHeight: "100vh" }}
    >
      {parse(`${data}`)}
    </div>
  );
}
