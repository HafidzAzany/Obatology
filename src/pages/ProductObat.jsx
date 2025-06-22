import React from "react";
import { Link } from "react-router-dom";
import medicines from "../data/medicine.json";

const categories = [
  "Generic Medicine",
  "Diabetes",
  "Pain Relief",
  "First Aid"
];

const services = [
  "Penebusan Resep",
  "Pengantaran ke Rumah",
  "Konsultasi Kesehatan"
];

export default function ProductObat() {
  return (
    <div className="bg-blue-100 text-black">
      <section className="container mx-auto px-4 py-12">
        <p className="text-green-600 font-semibold">Unggulan</p>
        <h2 className="text-3xl font-bold mb-4">Produk Kami</h2>
        <p className="text-gray-600 max-w-md mb-10">
          Kami menyediakan berbagai produk kesehatan berkualitas tinggi yang
          siap dikirim langsung ke rumah Anda. Temukan kebutuhan Anda dengan
          mudah di sini.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {medicines.slice(0, 3).map((medicine) => (
            <Link 
              key={medicine.id}
              to={`/product/${medicine.id}`}
              className="bg-black h-64 rounded-xl text-white flex flex-col justify-between p-4 hover:shadow-lg transition-shadow"
            >
              <div></div>
              <div>
                <h3 className="text-lg font-medium">{medicine.name}</h3>
                <div className="text-sm">
                  <span className="text-blue-600">Stok: {medicine.stock}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, idx) => (
            <div
              key={category}
              className="bg-black rounded-xl h-48 p-6 text-white flex flex-col justify-between"
            >
              <div className="text-lg font-semibold">{category}</div>
              <Link to="#" className="text-sm text-blue-400 underline">
                Jelajahi Kategori →
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-blue-700 text-white py-12 px-6 rounded-xl">
          <p className="text-green-300 font-semibold mb-2">Layanan</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Layanan Apotek Lengkap
          </h3>
          <p className="max-w-lg mb-10">
            Kami menawarkan layanan kesehatan yang komprehensif mulai dari
            penebusan resep, pengiriman langsung ke rumah, hingga konsultasi
            kesehatan dengan tenaga profesional.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-black rounded-xl h-48 p-6 text-white flex flex-col justify-end"
              >
                <p className="text-sm font-medium">
                  {idx + 1}. {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}