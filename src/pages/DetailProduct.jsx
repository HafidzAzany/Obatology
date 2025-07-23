import React from "react";
import { useParams, Link } from "react-router-dom";
import medicines from "../data/medicine.json";

const DetailProduct = () => {
  const { id } = useParams();
  const product = medicines.find((med) => med.id === id);

  
  const productDetailImages = {
    "Augmentin 625 Duo Tablet": "https://th.bing.com/th/id/OIP.Th-tOf3ZHXk0xKTINnvtwAHaHa?w=158&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
    "Azithral 500 Tablet": "https://th.bing.com/th/id/OIP._OQxU__KSN6QwXMPWhq2wAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
    "Ascoril LS Syrup": "https://th.bing.com/th/id/OIP.BtO5brgMH1WU6F5K5NK3VQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3", // <--- Tambahan baru
  };

  if (!product) {
    return <div className="p-6 text-center">Produk tidak ditemukan</div>;
  }

 
  const imageUrl = productDetailImages[product.name];

  return (
    <div data-aos="fade-right">
      <div className="bg-white min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link to="/products" className="text-blue-600 hover:underline">
              &larr; Kembali ke Produk
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bagian gambar produk */}
            <div className="bg-gray-100 rounded-lg h-64 md:h-96 flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Gambar Produk Tidak Tersedia</span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {product.group}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Rp99.990
                </h2>
                <p className="text-green-600 font-medium">
                  Stok tersedia: {product.stock}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600">
                  {product.name} adalah obat berkualitas tinggi yang digunakan
                  untuk mengatasi berbagai kondisi kesehatan. Produk ini telah
                  terdaftar dengan ID {product.id} dan termasuk dalam kategori{" "}
                  {product.group}.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Detail Produk</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>ID Produk:</strong> {product.id}
                  </li>
                  <li>
                    <strong>Kategori:</strong> {product.group}
                  </li>
                  <li>
                    <strong>Stok Tersedia:</strong> {product.stock}
                  </li>
                </ul>
              </div>

              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg w-full md:w-auto">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;