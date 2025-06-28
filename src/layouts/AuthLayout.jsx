import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png"; // Pastikan path-nya sesuai

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Logo di atas tulisan Obatology */}
          <img src={logo} alt="Logo Obatology" className="w-40 h-40
           mb-2" />

          <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
            <span className="text-blue-500">Selamat Datang</span>
            <span className="text-green-500">!</span>
          </h1>
        </div>

        <Outlet />

        <p className="text-center text-sm text-gray-500 mt-6">
          {/* Optional: copyright or tagline */}
        </p>
      </div>
    </div>
  );
}
