import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "../../Context/menuContext";
import { WindowWidth } from "./../../Context/WindowContext";

export default function DashHeader() {
  const { setIsOpen } = useContext(Menu);
  const { isOpen } = useContext(Menu);
  const { windowWidth } = useContext(WindowWidth);

  return (
    <nav
      className="navbar shadow-sm bg-light bg-body-tertiary"
      style={{ position: isOpen && windowWidth <= 992 && "sticky", top: "0" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <span onClick={() => setIsOpen((prev) => !prev)}>
            <i
              className="fa-solid fa-bars"
              style={{ cursor: "pointer", fontSize: "23px" }}
            ></i>
          </span>
          <Link
            to="/dashboard/home"
            className="navbar-brand pb-0 mb-0 mt-0 pt-0 custom-link"
          >
            لوحة التحكم
          </Link>
        </div>
        <Link to="/" className="btn btn-primary text-white">
          العودة للموقع
        </Link>
      </div>
    </nav>
  );
}
