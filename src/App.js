import { Route, Routes } from "react-router-dom";
import PersistLogin from "./Components/PersistLogin";
import AuthRequire from "./Context/RequireAuth";
import DashAboutUsPage from "./Pages/Dashboard/AboutUsPage";
import DashBoard from "./Pages/Dashboard/DashBoard";
import DashHomePage from "./Pages/Dashboard/HomePage";
import Services from "./Pages/Dashboard/Services/Services";
import Login from "./Pages/Dashboard/Login";
import CreateService from "./Pages/Dashboard/Services/CreateService";
import UpdateService from "./Pages/Dashboard/Services/UpdateService";
import Gallery from "./Pages/Dashboard/Gallery/Gallery";
import Contact from "./Pages/Dashboard/Contact";
import Footer from "./Pages/Dashboard/Footer";
import Map from "./Pages/Dashboard/Map";
import Settings from "./Pages/Dashboard/Settings";
import HomePage from "./Pages/Website/HomePage";
import Website from "./Pages/Website/Website";
import AboutPage from "./Pages/Website/AboutPage";
import ServicesPage from "./Pages/Website/Services";
import GalleryPage from "./Pages/Website/Gallery";
import ContactUsPage from "./Pages/Website/ContactUsPage";
import { useEffect } from "react";
import { baseUrl } from "./Api/Api";
import Logout from "./Pages/Dashboard/logout";

function App() {
  useEffect(() => {
    fetch(`${baseUrl}/tab`)
      .then((res) => res.json())
      .then(
        (data) =>
          (document.querySelector('link[rel="icon"]').href = data[0].icon)
      );
  }, []);
  useEffect(() => {
    fetch(`${baseUrl}/color`)
      .then((res) => res.json())
      .then((data) => {
        document.documentElement.style.setProperty(
          "--primary-color",
          data[0].color
        );
      });
  }, []);
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<AuthRequire />}>
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="home" element={<DashHomePage />} />
            <Route path="aboutus" element={<DashAboutUsPage />} />
            <Route path="services" element={<Services />} />
            <Route path="services/create-service" element={<CreateService />} />
            <Route
              path="services/update-service/:id"
              element={<UpdateService />}
            />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="footer" element={<Footer />} />
            <Route path="map" element={<Map />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
      </Route>
      {/* Public Routes */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Website />}>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactUsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
