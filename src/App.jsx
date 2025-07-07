import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React from "react";

// Dashoard & Admin
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MedicineList = React.lazy(() => import("./pages/MedicineList"));
const TambahObat = React.lazy(() => import("./pages/TambahObat"));
const EditObat = React.lazy(() => import("./pages/EditObat"));
const MedicineGroup = React.lazy(() => import("./pages/MedicineGroup"));
const GroupDetail = React.lazy(() => import("./pages/GroupDetail"));
const DetailProduct = React.lazy(() => import("./pages/DetailProduct"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
import Loading from "./components/Loading.jsx";
import { MdAdminPanelSettings } from "react-icons/md";

// Import dan lazy load untuk ListUser dan ReportPage
const ListUser = React.lazy(() => import("./pages/ListUser")); // Pastikan path ini benar: pages/ListUser.jsx
const ReportPage = React.lazy(() => import("./pages/ReportPage")); // Tambahkan ini untuk Laman Laporan

// Landing Guest
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const LandingLayout = React.lazy(() => import("./layouts/LandingLayout"));
import ProductsLanding from "./pages/ProductObat.jsx";
import AboutClinic from "./pages/AboutClinic";
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route Admin - Dibungkus dengan MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/obat" element={<MedicineList />} />
          <Route path="/tambah-obat" element={<TambahObat />} />
          <Route path="/edit-obat/:id" element={<EditObat />} />
          <Route path="/grup" element={<MedicineGroup />} />
          <Route path="/group-detail" element={<GroupDetail />} />
          <Route path="/inventory" element={<Inventory />} />

          {/* Rute baru untuk Data User dan Laporan */}
          <Route path="/data-user" element={<ListUser />} /> {/* Rute untuk Data User */}
          <Route path="/laporan" element={<ReportPage />} /> {/* Rute untuk Laman Laporan */}

          {/* Rute catch-all untuk admin jika tidak ada yang cocok di dalam MainLayout,
              tapi pastikan ini tidak menimpa rute lain di luar MainLayout */}
          {/* <Route path="*" element={<MedicineList />} /> // Ini bisa menyebabkan masalah jika ditaruh di sini */}
        </Route>

        {/* Route catch-all untuk halaman yang tidak ditemukan di admin (jika tidak masuk ke MainLayout) */}
        {/* Hati-hati dengan path="/*" di sini, bisa menimpa rute lain. Lebih baik letakkan di paling bawah. */}
        {/* <Route
          path="/*"
          element={
            <ErrorPage
              kode="403"
              deskripsi="Halaman ini masih dalam maintanence"
              img="./img/Error403.jpg"
            />
          }
        /> */}

        {/* Route Guest - Dibungkus dengan LandingLayout */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsLanding />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutClinic />} />
        </Route>

        {/* Halaman Auth - Dibungkus dengan AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Rute catch-all global untuk halaman yang tidak ditemukan (404) */}
        {/* Letakkan ini di paling bawah agar tidak menimpa rute lain */}
        <Route
          path="*" // Menggunakan path="*" di sini akan menangkap semua rute yang tidak cocok di atasnya
          element={
            <ErrorPage
              kode="404" // Ubah kode menjadi 404 karena ini adalah halaman tidak ditemukan
              deskripsi="Halaman tidak ditemukan atau sedang dalam pemeliharaan."
              img="./img/Error403.jpg" // Atau gunakan gambar 404 jika ada
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;