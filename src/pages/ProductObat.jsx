import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = ["Generic Medicine", "Diabetes", "Pain Relief", "First Aid"];
const services = [
  "Penebusan Resep",
  "Pengantaran ke Rumah",
  "Konsultasi Kesehatan",
];

// Gambar default jika tidak tersedia
const defaultImage = "https://via.placeholder.com/300x300?text=No+Image";

// Objek gambar produk unggulan (sesuaikan nama_obat di DB)
const productImages = {
  Paracetamol:
    "https://th.bing.com/th/id/OIP.Th-tOf3ZHXk0xKTINnvtwAHaHa?w=158&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  Amoxicillin:
    "https://th.bing.com/th/id/OIP._OQxU__KSN6QwXMPWhq2wAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  Ibuprofen:
    "https://th.bing.com/th/id/OIP.BtO5brgMH1WU6F5K5NK3VQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  Cetirizine: "https://bernofarm.com/wp-content/uploads/2022/03/lengkap-2.png",
  Tramadol:
    "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/fO-HbyvUDqoRoQnPcxwyZ/original/1667723141-Tramadol.jpg",
  Panadol_Extra:
    "https://th.bing.com/th/id/OIP.BtO5brgMH1WU6F5K5NK3VQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
};

const categoryImages = {
  "Generic Medicine":
    "https://tse1.mm.bing.net/th/id/OIP.b1AIPW3THOpreN7DhVty5gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
  Diabetes:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwt3_L_e8KC6Fzl4V4yFk8A4PrYzMLGdK7ZA&s",
  "Pain Relief":
    "https://www.nps.org.au/assets/_750x468_crop_center-center_75_none/GettyImages-1134788257.jpg",
  "First Aid":
    "https://firstaidsuppliesonline.com/wp-content/uploads/2021/09/first-aid-kit-1-1024x587.jpeg",
};

const serviceImages = {
  "Penebusan Resep":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrG_ynojOZuO-0asq3v5q_uE64CN2IBRwqg&s",
  "Pengantaran ke Rumah":
    "data:image/jpeg;base64,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",
  "Konsultasi Kesehatan":
    "https://asset.kompas.com/crops/XqHJI3S-mSqWf5ZhG2IzgaAQwm8=/114x0:1000x591/1200x800/data/photo/2020/10/28/5f990da8521fa.jpg",
};

export default function ProductObat() {
  const [obatList, setObatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadObat = async () => {
    try {
      setLoading(true);
      const data = await obatAPI.fetchObat();
      setObatList(data);
    } catch (err) {
      setError("Gagal memuat data produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObat();
    AOS.init({ once: true, duration: 800 }); // init AOS
  }, []);

  return (
    <div className="bg-blue-100 text-black">
      <section className="container mx-auto px-4 py-12">
        <div data-aos="fade-up">
          <p className="text-green-600 font-semibold">Unggulan</p>
          <h2 className="text-3xl font-bold mb-4">Produk Kami</h2>
          <p className="text-gray-600 max-w-md mb-10">
            Kami menyediakan berbagai produk kesehatan berkualitas tinggi yang
            siap dikirim langsung ke rumah Anda.
          </p>

          {/* Loading & Error */}
          {loading && <LoadingSpinner text="Memuat produk..." />}
          {error && !loading && <EmptyState text={error} />}

          {/* Produk unggulan */}
          {!loading && !error && obatList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {obatList.slice(0, 3).map((obat, idx) => (
                <Link
                  key={obat.id_obat}
                  to={`/product/${obat.id_obat}`}
                  className="bg-black h-64 rounded-xl text-white flex flex-col justify-between p-4 hover:shadow-lg transition-shadow relative overflow-hidden"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 100}
                >
                  <div className="absolute inset-0">
                    <img
                      src={productImages[obat.nama_obat] || defaultImage}
                      alt={obat.nama_obat}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <h3 className="text-lg font-medium">{obat.nama_obat}</h3>
                    <span className="text-blue-400 text-sm">
                      Stok: {obat.quantity}
                    </span>
                    <p className="text-xs text-gray-300">
                      Grup: {obat.grup_obat?.nama_grup || "-"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Kategori */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            data-aos="fade-up"
          >
            {categories.map((category, idx) => (
              <div
                key={category}
                className="bg-black rounded-xl h-48 p-6 text-white flex flex-col justify-between relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="absolute inset-0">
                  <img
                    src={categoryImages[category] || defaultImage}
                    alt={category}
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="text-lg font-semibold">{category}</div>
                  <Link to="#" className="text-sm text-blue-400 underline">
                    Jelajahi Kategori →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Layanan */}
          <div
            className="bg-blue-700 text-white py-12 px-6 rounded-xl"
            data-aos="fade-up"
          >
            <p className="text-green-300 font-semibold mb-2">Layanan</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Layanan Apotek Lengkap
            </h3>
            <p className="max-w-lg mb-10">
              Kami menawarkan layanan kesehatan komprehensif mulai dari
              penebusan resep, pengiriman langsung ke rumah, hingga konsultasi
              kesehatan.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-black rounded-xl h-48 p-6 text-white flex flex-col justify-end relative overflow-hidden"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 100}
                >
                  <div className="absolute inset-0">
                    <img
                      src={serviceImages[service] || defaultImage}
                      alt={service}
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
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
