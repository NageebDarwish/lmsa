import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sideItems } from "./SideBarItems";
import "./side-bar.css";
import { Menu } from "../../Context/menuContext";
import { WindowWidth } from "../../Context/WindowContext";

export default function DashSideBar() {
  // Get Menu Statue
  const menu = useContext(Menu);
  // Get WindowWidth
  const { windowWidth } = useContext(WindowWidth);

  // Handle SideBar ON Small Screen When Click on NavLink

  function HandleSideSmall() {
    return windowWidth <= 992 && menu.setIsOpen(false);
  }

  const sideBarItems = sideItems.map((item, i) => (
    <NavLink
      key={i}
      to={`/dashboard/${item.path}`}
      className="p-2 mx-2 my-1 mt-3 custom-a side"
      style={{ justifyContent: `${menu.isOpen ? "" : "center"}` }}
      onClick={HandleSideSmall}
    >
      <i className={item.icon}></i>
      {menu.isOpen && <span className="pe-1">{item.name}</span>}
    </NavLink>
  ));

  // Define SideBar Width
  const width = menu.isOpen ? (windowWidth > "992" ? "18%" : "200px") : "60px";
  const translateSideBar = menu.isOpen ? "translateX(0)" : "translateX(100%)";

  return (
    <>
      {menu.isOpen && windowWidth <= 992 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: "0.3",
            position: "fixed",
            zIndex: "1",
          }}
        ></div>
      )}
      <div
        style={{
          position: windowWidth <= 992 && "fixed",
          top: "71px",
          transform: windowWidth <= 992 && translateSideBar,
          transition: "0.3s",
          boxShadow: "0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)",
          width: width,
          backgroundColor: "#343A40",
          height: windowWidth <= 992 && "100vh",
          zIndex: "2",
        }}
        className="side-bar"
      >
        <div className="d-flex flex-column">{sideBarItems}</div>
      </div>
    </>
  );
}
