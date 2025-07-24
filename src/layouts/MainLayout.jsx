import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div data-aos="zoom-out">
      <div id="app-container" className="bg-gray-50 min-h-screen flex">
        <div id="layout-wrapper" className="flex flex-row w-full">
          <Sidebar />
          <div id="main-content" className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <Header />
            <div className="max-w-full mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}