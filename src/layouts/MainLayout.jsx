import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div data-aos="zoom-out">
      <div id="app-container" className="bg-white min-h-screen flex ">
        <div id="layout-wrapper" className="flex flex-row flex-1">
          <Sidebar />
          <div id="main-content" className="flex-1 p-4">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
