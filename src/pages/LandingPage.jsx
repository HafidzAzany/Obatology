import React from "react";
import {
  FaShippingFast,
  FaMoneyCheckAlt,
  FaGift,
  FaHeadset,
} from "react-icons/fa";
import ProductsLanding from "./ProductsObat";

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
          <div className="bg-gray-300 h-64 md:h-80 rounded-xl"></div>
        </div>
      </section>

      {/* Fitur */}
      <section className="bg-white text-black py-12">
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
      </section>

      {/* Penawaran */}
      <section className="bg-[#f5f7fb] py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Promo 50% Off */}
          <div className="bg-[#e6eeff] rounded-xl p-8 md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
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
            <div className="w-40 h-40 bg-gray-800 rounded-lg relative">
              <div className="absolute top-4 right-4 flex space-x-1">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="relative bg-blue-600 text-white rounded-xl p-6 flex flex-col justify-between">
            <div className="absolute top-4 right-4 flex space-x-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
            </div>
            <p className="text-sm mb-4">
              Nikmati diskon untuk pembelian pertama Anda di website kami
            </p>

            <div className="flex items-center justify-between mt-auto">
              <h2 className="text-3xl text-white font-bold">
                <span className="text-2xl text-green-600 font-bold">30%</span>
                Diskon
              </h2>
              <button className="bg-white text-blue-600 font-semibold text-sm px-4 py-2 rounded-full hover:bg-blue-100 transition">
                Belanja Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Produk Unggulan Apotek</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Tablet Asetaminofen",
              "Sirup Pereda Tenggorokan",
              "Multivitamin B6+",
            ].map((item) => (
              <div
                key={item}
                className="bg-gray-200 h-48 rounded-xl flex items-center justify-center font-medium relative"
              >
                <div className="absolute top-4 right-4 flex space-x-1">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Kami */}
      <section className="bg-white py-16 text-black">
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
      </section>

      {/* Layanan */}
      <section className="bg-blue-700 py-20 text-white">
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
                  0{idx + 1}. {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
