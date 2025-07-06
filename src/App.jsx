import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React from "react";

//Dashoard & Admin
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MedicineList = React.lazy(() => import("./pages/MedicineList"));
const TambahObat = React.lazy(() => import("./pages/TambahObat"));
const EditObat = React.lazy(() => import("./pages/EditObat"));
const MedicineGroup = React.lazy(() => import("./pages/MedicineGroup"));
const GroupDetail = React.lazy(() => import("./pages/GroupDetail"));
const DetailProduct = React.lazy(() => import("./pages/DetailProduct"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Products = React.lazy(() => import("./pages/Products"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
import Loading from "./components/Loading.jsx";
import { MdAdminPanelSettings } from "react-icons/md";
// import ListUser from "./pages/ListUser"; // ERROR DATA USER IKI
// const ListUser = React.lazy(() => import("./pages/User"));

//Landing Guest
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const LandingLayout = React.lazy(() => import("./layouts/LandingLayout"));
import ProductsLanding from "./pages/ProductObat.jsx";
import AboutClinic from "./pages/AboutClinic";
const NavBar = React.lazy(() => import("./components/ComponentsGuest/NavBar"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route Admin */}
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/obat" element={<MedicineList />} />
          <Route path="/tambah-obat" element={<TambahObat />} />
          <Route path="/edit-obat/:id" element={<EditObat />} />
          <Route path="*" element={<MedicineList />} />
          <Route path="/grup" element={<MedicineGroup />} />
          <Route path="/group-detail" element={<GroupDetail />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>

        <Route
          path="/*"
          element={
            <ErrorPage
              kode="403"
              deskripsi="Halaman ini masih dalam maintanence"
              img="./img/Error403.jpg"
            />
          }
        />

        {/* Route Guest */}
        <Route element={<LandingLayout />}>
          {/* Route untuk halaman LandingPage */}
          <Route path="/" element={<LandingPage />} />
          {/* Route untuk halaman Produk */}
          <Route path="/products" element={<ProductsLanding />} />
          {/* <Route path="/products" element={<ProductObat />} /> */}
          <Route path="/product/:id" element={<DetailProduct />} />
          {/* Route untuk halaman About */}
          <Route path="/about" element={<AboutClinic />} />
          {/* Route untuk halaman Data User */}

          {/* <Route path="/ListUser" element={<ListUser />} />*/}

          <Route
            path="/*"
            element={
              <ErrorPage
                kode="403"
                deskripsi="Halaman ini masih dalam maintanence"
                img="./img/Error403.jpg"
              />
            }
          />
        </Route>

        {/* Halaman Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
