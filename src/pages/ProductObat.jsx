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
const defaultImage = "https://d2qjkwm11akmwu.cloudfront.net/products/695343_19-11-2024_13-42-19.png";

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
  Ranitidine:
    "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/09/24024349/Ranitidin.jpg.webp",
  Panadol:
    "https://w7.pngwing.com/pngs/928/583/png-transparent-acetaminophen-tablet-ache-sore-throat-migraine-tablet-electronics-influenza-tablet-thumbnail.png",
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
    "https://www.emedstore.in//blogadmin/uploads/post/main/How-Medicine-Delivery-Apps-Can-Transform-Healthcare_(1)_POST_1652179258.jpg",
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
