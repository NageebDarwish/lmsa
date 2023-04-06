import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { baseUrl } from "../../Api/Api";
import Footer from "../../Components/Website/Footer";
import Header from "../../Components/Website/Header";

export default function Website() {
  useEffect(() => {
    fetch(`${baseUrl}/tab`)
      .then((res) => res.json())
      .then((data) => {
        document.title = data[0].title;
      });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
