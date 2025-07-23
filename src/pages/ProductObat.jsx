import React from "react";
import { Link } from "react-router-dom";
import medicines from "../data/medicine.json";

const categories = ["Generic Medicine", "Diabetes", "Pain Relief", "First Aid"];

const services = [
  "Penebusan Resep",
  "Pengantaran ke Rumah",
  "Konsultasi Kesehatan",
];

export default function ProductObat() {
  // Objek untuk menyimpan link gambar berdasarkan nama produk (untuk produk unggulan)
  const productImages = {
    "Augmentin 625 Duo Tablet": "https://th.bing.com/th/id/OIP.Th-tOf3ZHXk0xKTINnvtwAHaHa?w=158&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
    "Azithral 500 Tablet": "https://th.bing.com/th/id/OIP._OQxU__KSN6QwXMPWhq2wAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
    "Ascoril LS Syrup": "https://th.bing.com/th/id/OIP.BtO5brgMH1WU6F5K5NK3VQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  };

  // Objek untuk menyimpan link gambar berdasarkan nama kategori
  const categoryImages = {
    "Generic Medicine": "https://tse1.mm.bing.net/th/id/OIP.b1AIPW3THOpreN7DhVty5gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    "Diabetes": "https://hopkinsdiabetesinfo.org/wp-content/uploads/2016/03/Type-2-diabetes-sequencing-therapies-62428694_Double-1080x675.jpg",
    "Pain Relief": "https://th.bing.com/th/id/OIP.CDNxC9DSsH0wcMu7v10iOgHaDt?w=276&h=174&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
    "First Aid": "https://firstaidsuppliesonline.com/wp-content/uploads/2021/09/first-aid-kit-1-1024x587.jpeg",
  };

  // Objek untuk menyimpan link gambar berdasarkan nama layanan
  const serviceImages = {
    "Penebusan Resep": "https://png.pngtree.com/png-clipart/20220909/original/pngtree-pharmacist-giving-medicine-pills-to-patient-another-hand-png-image_8520197.png",
    "Pengantaran ke Rumah": "https://tse2.mm.bing.net/th/id/OIP.7lFG85hiJA7dmLniqqpL0wHaCX?rs=1&pid=ImgDetMain&o=7&rm=3",
    "Konsultasi Kesehatan": "https://th.bing.com/th/id/OIP.kZ-irDQfN14r6VXcuJI4YgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  };


  return (
    <div className="bg-blue-100 text-black">
      <section className="container mx-auto px-4 py-12">
        <div data-aos="zoom-in">
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
                className="bg-black h-64 rounded-xl text-white flex flex-col justify-between p-4 hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                {/* Bagian untuk gambar produk unggulan */}
                <div className="absolute inset-0">
                  {productImages[medicine.name] ? (
                    <img
                      src={productImages[medicine.name]}
                      alt={medicine.name}
                      className="w-full h-full object-cover opacity-70"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                      {/* Placeholder teks jika tidak ada gambar */}
                      Gambar Belum Tersedia
                    </div>
                  )}
                </div>

                {/* Konten di atas gambar (agar terlihat) */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div></div> {/* Div kosong untuk menjaga layout */}
                  <div>
                    <h3 className="text-lg font-medium">{medicine.name}</h3>
                    <div className="text-sm">
                      <span className="text-blue-600">
                        Stok: {medicine.stock}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bagian Kategori */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, idx) => (
              <div
                key={category}
                className="bg-black rounded-xl h-48 p-6 text-white flex flex-col justify-between relative overflow-hidden"
              >
                {/* Gambar untuk Kategori */}
                <div className="absolute inset-0">
                    {categoryImages[category] ? (
                        <img
                            src={categoryImages[category]}
                            alt={category}
                            className="w-full h-full object-cover opacity-50"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                            Gambar Kategori Belum Tersedia
                        </div>
                    )}
                </div>

                {/* Konten teks kategori di atas gambar */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="text-lg font-semibold">{category}</div>
                    <Link to="#" className="text-sm text-blue-400 underline">
                        Jelajahi Kategori →
                    </Link>
                </div>
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
                  className="bg-black rounded-xl h-48 p-6 text-white flex flex-col justify-end relative overflow-hidden"
                >
                  {/* Gambar untuk Layanan */}
                  <div className="absolute inset-0">
                      {serviceImages[service] ? (
                          <img
                              src={serviceImages[service]}
                              alt={service}
                              className="w-full h-full object-cover opacity-50"
                          />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                              Gambar Layanan Belum Tersedia
                          </div>
                      )}
                  </div>

                  {/* Konten teks layanan di atas gambar */}
                  <div className="relative z-10">
                    <p className="text-sm font-medium">
                      {idx + 1}. {service}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}