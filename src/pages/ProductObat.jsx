import React from "react";
import { Link } from "react-router-dom";

import acetaminophenImg from "../assets/obat/acetaminophen.png";
import lozengesImg from "../assets/obat/lozenges.png";
import multivitaminImg from "../assets/obat/multivitamin.png";

const products = [
  {
    name: "Acetaminophen Pills",
    oldPrice: "$18.00",
    newPrice: "$12.00",
    image: acetaminophenImg,
  },
  {
    name: "Throat Lozenges Syrup",
    oldPrice: "$18.00",
    newPrice: "$12.00",
    image: lozengesImg,
  },
  {
    name: "Multivitamin B6+",
    oldPrice: "$18.00",
    newPrice: "$12.00",
    image: multivitaminImg,
  },
];

const categories = [
  "Pereda Nyeri",
  "Obat Alergi",
  "Perlengkapan P3K",
  "Perawatan Gigi",
];

const services = [
  "Penebusan Resep",
  "Pengantaran ke Rumah",
  "Konsultasi Kesehatan",
];

export default function ProductsPage() {
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

        {/* Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-xl shadow text-black p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <div className="text-sm">
                <span className="line-through text-gray-500 mr-2">
                  {product.oldPrice}
                </span>
                <span className="text-blue-600">{product.newPrice}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Kategori */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
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

        {/* Layanan */}
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
