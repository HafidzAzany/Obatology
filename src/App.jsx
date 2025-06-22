import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React from "react";

//Dashoard
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const Customers = React.lazy(() => import("./pages/Customers"));
const FormCustomers = React.lazy(() => import("./pages/FormCustomers"));
const Orders = React.lazy(() => import("./pages/Orders"));
//Admin
const MedicineList = React.lazy(() => import("./pages/MedicineList"));
const MedicineGroup = React.lazy(() => import("./pages/MedicineGroup"));
const DetailProduct = React.lazy(() => import("./pages/DetailProduct"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Products = React.lazy(() => import("./pages/Products"));
const Notes = React.lazy(() => import("./pages/Notes"));
const FormOrders = React.lazy(() => import("./pages/FormOrders"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
import Loading from "./components/Loading.jsx";
import { MdAdminPanelSettings } from "react-icons/md";

//ProductsLanding
import ProductsLanding from "./pages/ProductObat.jsx";

//AboutClinic
import AboutClinic from "./pages/AboutClinic";
// import MedicineGroup from "./pages/MedicineGroup.jsx";

const ListUser = React.lazy(() => import("./pages/User"));
const NavBar = React.lazy(() => import("./components/ComponentsGuest/NavBar"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

//PROJECT
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const LandingLayout = React.lazy(() => import("./layouts/LandingLayout"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route untuk halaman Dashboard */}
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/obat" element={<MedicineList />} />
          <Route path="/grup" element={<MedicineGroup />} />
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

        {/* Route untuk halaman LandingPage */}
        <Route element={<LandingLayout />}>
          {/* Route untuk halaman LandingPage */}
          <Route path="/" element={<LandingPage />} />

          {/* Route untuk halaman Produk */}
          <Route path="/products" element={<ProductsLanding />} />
          {/* <Route path="/products" element={<ProductObat />} /> */}
        <Route path="/product/:id" element={<DetailProduct />} />

          {/* Route untuk halaman About */}
          <Route path="/about" element={<AboutClinic />} />

          

          {/* <Route path="/orders" element={<Orders />} />
          <Route path="/formorders" element={<FormOrders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/formcustomers" element={<FormCustomers />} /> */}
          <Route
            path="/400"
            element={
              <ErrorPage
                kode="400"
                deskripsi="Halaman ini masih dalam maintanence"
                img="./img/Error400.jpg"
              />
            }
          />
          <Route
            path="/401"
            element={
              <ErrorPage
                kode="401"
                deskripsi="Halaman ini masih dalam maintanence"
                img="./img/Error401.jpg"
              />
            }
          />
          <Route
            path="/403"
            element={
              <ErrorPage
                kode="403"
                deskripsi="Halaman ini masih dalam maintanence"
                img="./img/Error403.jpg"
              />
            }
          />
          {/* <Route path="/ListUser" element={<ListUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/notes" element={<Notes />} /> */}
        </Route>
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
