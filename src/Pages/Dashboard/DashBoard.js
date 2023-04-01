import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../../Components/Dashboard/Header";
import DashSideBar from "../../Components/Dashboard/SideBar";
import WindowProvider from "../../Context/WindowContext";

export default function DashBoard() {
  useEffect(() => {
    document.title = "لوحة التحكم";
  }, []);
  return (
    <WindowProvider>
      <div style={{ backgroundColor: "#F1F5F9" }}>
        <DashHeader />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <DashSideBar />
          <Outlet />
        </div>
      </div>
    </WindowProvider>
  );
}
