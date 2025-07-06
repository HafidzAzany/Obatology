import React from "react";
import {
  FaShippingFast,
  FaMoneyCheckAlt,
  FaGift,
  FaHeadset,
} from "react-icons/fa";
import ProductsLanding from "./ProductObat";
import { motion } from "framer-motion";
import bannerImage from "../assets/banner1.png"; // sesuaikan path-nya
import acetaminophen from "../assets/obat/acetaminophen.png";
import lozenges from "../assets/obat/lozenges.png";
import multivitamin from "../assets/obat/multivitamin.png";
import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";

export default function LandingPage() {
  return (
    <div className="bg-[#050827] text-white">
      {/* Hero Section */}
      <section className="bg-blue-100 text-black">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Apotek Online Terpercaya Anda
            </h1>
            <p className="mb-6 text-gray-600">
              Apotek online terbaik untuk semua kebutuhan Anda. Cepat,
              terpercaya, dan terjangkau.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              Belanja Sekarang
            </button>
          </div>
          <div className="bg-gray-300 h-64 md:h-80 rounded-xl">
            <div data-aos="zoom-out">
              <img
                src={bannerImage}
                alt="Banner"
                className="h-64 md:h-80 w-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="bg-white text-black py-12">
        <div data-aos="fade-right">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: (
                  <FaShippingFast className="mx-auto text-blue-600 text-2xl" />
                ),
                label: "Gratis Ongkir",
              },
              {
                icon: (
                  <FaMoneyCheckAlt className="mx-auto text-blue-600 text-2xl" />
                ),
                label: "Pembayaran Cepat",
              },
              {
                icon: <FaGift className="mx-auto text-blue-600 text-2xl" />,
                label: "Cashback Besar",
              },
              {
                icon: <FaHeadset className="mx-auto text-blue-600 text-2xl" />,
                label: "Layanan 24/7",
              },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center space-x-2 justify-center"
              >
                <div className="text-2xl font-bold">{feature.icon}</div>
                <p className="font-medium text-sm">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penawaran */}
      <section id="promo" className="bg-[#f5f7fb] py-16">
        <div data-aos="zoom-in">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
            {/* Promo 50% Off */}
            <div className="bg-[#e6eeff] rounded-xl p-8 md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <p className="text-sm font-semibold text-gray-700">
                  Diskon Besar
                </p>
                <h2 className="text-3xl text-blue-600 font-bold">
                  Dapatkan Tambahan <span className="text-green-600">50%</span>{" "}
                  Diskon
                </h2>
                <p className="text-gray-500 mt-2">
                  Libero diam auctor tristique hendrerit in eu vel id.
                </p>
              </div>
              <div className="w-40 h-40 relative">
                <img
                  src={promo1}
                  alt="Promo 50%"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                </div>
              </div>
            </div>

            {/* Promo 30% Off */}
            <div className="relative bg-blue-600 text-white rounded-xl p-6 flex flex-col justify-between">
              <div className="absolute top-4 right-4 flex space-x-1">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
              </div>
              <div className="mb-4">
                <p className="text-sm mb-2">
                  Nikmati diskon untuk pembelian pertama Anda di website kami
                </p>
                <img
                  src={promo2}
                  alt="Promo 30%"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <h2 className="text-3xl text-white font-bold">
                  <span className="text-2xl text-green-600 font-bold">30%</span>{" "}
                  Diskon
                </h2>
                <button className="bg-white text-blue-600 font-semibold text-sm px-4 py-2 rounded-full hover:bg-blue-100 transition">
                  Belanja Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section id="products" className="bg-white text-black py-16">
        <div data-aos="zoom-in">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Produk Unggulan Apotek</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Tablet Asetaminofen",
                  image: acetaminophen,
                },
                {
                  name: "Sirup Pereda Tenggorokan",
                  image: lozenges,
                },
                {
                  name: "Multivitamin B6+",
                  image: multivitamin,
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 text-center font-medium">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kenapa Kami */}
      <section id="whyus" className="bg-white py-16 text-black">
        <div data-aos="slide-left">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Komitmen Kami terhadap Kualitas
              </h2>
              <div>
                <p className="font-medium">✅ Produk Lengkap</p>
                <p className="text-sm text-gray-600">
                  Dari obat resep hingga suplemen kesehatan
                </p>
              </div>
              <div>
                <p className="font-medium">✅ Jaminan Kualitas</p>
                <p className="text-sm text-gray-600">
                  Praktik apotek berstandar tinggi
                </p>
              </div>
              <div>
                <p className="font-medium">✅ Ramah Lingkungan</p>
                <p className="text-sm text-gray-600">Kemasan berkelanjutan</p>
              </div>
            </div>
            <div className="bg-gray-300 h-64 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section className="bg-blue-700 py-20 text-white">
        <div data-aos="slide-right">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">
              Layanan Apotek Terlengkap
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Pembuatan Resep Obat",
                "Pengiriman ke Rumah",
                "Konsultasi Kesehatan",
              ].map((service, idx) => (
                <div
                  key={service}
                  className="bg-white text-blue-800 p-6 rounded-xl"
                >
                  <p className="font-bold">
                    {idx + 1}. {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
