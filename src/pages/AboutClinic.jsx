import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AboutClinic() {
  const testimonials = [
    {
      quote:
        "Pharmacy Store adalah tempat andalan saya untuk mendapatkan obat bebas dan produk kesehatan. Mereka memiliki banyak pilihan, dan situs web mereka memudahkan pemesanan online. Satu-satunya saran saya adalah memperluas bagian kecantikan dan perawatan kulit mereka.",
      name: "Theresa J. Jones",
      age: "24 tahun",
    },
    {
      quote:
        "Layanan hebat dan pengiriman cepat! Saya selalu menemukan apa yang saya butuhkan di sini. Sangat direkomendasikan bagi siapa pun yang mencari apotek terpercaya.",
      name: "Sarah J., Jakarta",
      age: "32 tahun",
    },
    {
      quote:
        "Dukungan pelanggan yang luar biasa dan harga terjangkau. Ini adalah tempat favorit saya untuk mendapatkan suplemen kesehatan.",
      name: "Rudi H., Bandung",
      age: "29 tahun",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-blue-100 text-[#0b0b0b]">
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="max-w-lg">
            <p className="text-green-600 font-semibold mb-2">Tim</p>
            <h2 className="text-3xl font-bold mb-4">
              Jantung dari Apotek Kami
            </h2>
            <p className="text-gray-600 mb-6">
              Kami percaya bahwa kekuatan sebuah apotek terletak pada
              orang-orang di baliknya. Tim profesional kami siap memberikan
              layanan terbaik untuk Anda setiap hari.
            </p>
          </div>
          <div>
            <button className="border rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition">
              Semua Tim
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div>
            <div className="bg-gray-800 h-60 mb-4 rounded-xl"></div>
            <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
              Apoteker Utama
            </span>
            <h4 className="font-semibold">Dr. Emily Roberts, PharmD</h4>
            <p className="text-gray-500 text-sm">Pengalaman kerja - 15 tahun</p>
          </div>
          <div>
            <div className="bg-gray-800 h-60 mb-4 rounded-xl"></div>
            <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
              Penasihat Medis
            </span>
            <h4 className="font-semibold">Dr. Michael Chang, MD</h4>
            <p className="text-gray-500 text-sm">Pengalaman kerja - 12 tahun</p>
          </div>
          <div>
            <div className="bg-gray-800 h-60 mb-4 rounded-xl"></div>
            <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
              Direktur Layanan Kesehatan
            </span>
            <h4 className="font-semibold">Lisa Davis, RN, BSN</h4>
            <p className="text-gray-500 text-sm">Pengalaman kerja - 8 tahun</p>
          </div>
        </div>
      </section>

      <section id="testimonials"className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-lg">
              <p className="text-green-600 font-semibold mb-2">Ulasan</p>
              <h2 className="text-3xl font-bold mb-4">
                Testimoni yang Menginspirasi Kami
              </h2>
              <p className="text-gray-600 mb-6">
                Kami selalu senang menerima ulasan positif dari pelanggan kami.
                Setiap testimoni memberi semangat bagi tim kami untuk terus
                memberikan pelayanan terbaik.
              </p>
            </div>
            <div>
              <button className="border rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition">
                Semua Ulasan
              </button>
            </div>
          </div>

          <div className="mt-10">
            <Slider {...settings}>
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow p-6 rounded-lg max-w-xl mx-auto"
                >
                  <p className="italic text-gray-700 mb-4">"{item.quote}"</p>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.age}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
}
