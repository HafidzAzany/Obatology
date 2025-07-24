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
    <div data-aos="fade-down">
      <div className="bg-blue-100 text-[#0b0b0b]">
        {/* Bagian Tim Kami (Sudah ada) */}
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
            {/* Dr. Emily Roberts */}
            <div>
              <div className="bg-gray-800 h-60 mb-4 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5103AQHHQvEV2SVDjg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516240824673?e=1756339200&v=beta&t=Ey_m5EDQjFVYRXrf6tJbwL3lHy-_b9m-pgK1uipmRnM"
                  alt="Foto Dr. Emily Roberts"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
                Apoteker Utama
              </span>
              <h4 className="font-semibold">Dr. Emily Roberts, PharmD</h4>
              <p className="text-gray-500 text-sm">
                Pengalaman kerja - 15 tahun
              </p>
            </div>

            {/* Dr. Michael Chang, MD */}
            <div>
              <div className="bg-gray-800 h-60 mb-4 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://a.mktgcdn.com/p/iY6VMJsHQZf_0OVoo3_mcjWj_rh6RJBCXKgcChybJ8Q/2848x2848.jpg"
                  alt="Foto Dr. Michael Chang"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
                Penasihat Medis
              </span>
              <h4 className="font-semibold">Dr. Michael Chang, MD</h4>
              <p className="text-gray-500 text-sm">
                Pengalaman kerja - 12 tahun
              </p>
            </div>

            {/* Lisa Davis, RN, BSN */}
            <div>
              <div className="bg-gray-800 h-60 mb-4 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/C4D03AQH0IHZupIJsmA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1648686655487?e=1756339200&v=beta&t=WCUCM3MQr06rqhw3cUKRhpM12hTErq444J2UeuIRO4I"
                  alt="Foto Lisa Davis"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
                Direktur Layanan Kesehatan
              </span>
              <h4 className="font-semibold">Lisa Davis, RN, BSN</h4>
              <p className="text-gray-500 text-sm">
                Pengalaman kerja - 8 tahun
              </p>
            </div>
          </div>
        </section>

        {/* Bagian Kisah Kami (Our Story) - BARU */}
        <section className="py-20 container mx-auto px-4 bg-white rounded-xl shadow-lg mb-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Obatology Store dimulai pada tahun 2005 dengan visi untuk
              memudahkan akses masyarakat terhadap obat-obatan dan produk
              kesehatan yang berkualitas. Berawal dari apotek fisik kecil, kami
              berkembang menjadi platform online terkemuka, melayani ribuan
              pelanggan di seluruh Indonesia. Perjalanan kami penuh dengan
              dedikasi untuk inovasi dan pelayanan terbaik.
            </p>
            {/* Anda bisa menambahkan gambar atau elemen lain di sini */}
          </div>
        </section>

        {/* Bagian Misi dan Visi (Mission & Vision) - BARU */}
        <section className="py-20 container mx-auto px-4 bg-white rounded-xl shadow-lg mb-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-black-600">Misi Kami</h3>
              <p className="text-gray-700">
                Menyediakan akses mudah dan cepat ke berbagai produk kesehatan
                berkualitas tinggi, didukung oleh informasi yang akurat dan
                layanan pelanggan yang responsif.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-black-600">Visi Kami</h3>
              <p className="text-gray-700">
                Menjadi apotek online terdepan yang dipercaya masyarakat,
                memberikan solusi kesehatan inovatif dan berkelanjutan untuk
                kesejahteraan bersama.
              </p>
            </div>
          </div>
        </section>

        {/* Bagian Nilai-nilai Kami (Our Values) - BARU */}
        <section className="py-20 container mx-auto px-4 bg-white rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-xl mb-2">Integritas</h4>
              <p className="text-gray-600 text-sm">
                Kami menjunjung tinggi kejujuran dan etika dalam setiap aspek
                bisnis.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-xl mb-2">Inovasi</h4>
              <p className="text-gray-600 text-sm">
                Terus berinovasi untuk memberikan solusi kesehatan yang lebih
                baik.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-xl mb-2">Pelayanan Prima</h4>
              <p className="text-gray-600 text-sm">
                Komitmen untuk memberikan pengalaman terbaik bagi pelanggan.
              </p>
            </div>
          </div>
        </section>

        {/* Bagian Pencapaian dan Tonggak Sejarah (Achievements & Milestones) - BARU */}
        <section className="py-20 container mx-auto px-4 bg-white rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Pencapaian Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <p className="text-5xl font-bold text-blue-600 mb-2">1 Juta+</p>
              <p className="text-gray-700">Pelanggan Terlayani</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <p className="text-5xl font-bold text-green-600 mb-2">200+</p>
              <p className="text-gray-700">Produk Tersedia</p>
            </div>
            {/* Tambahkan lebih banyak pencapaian jika ada */}
          </div>
        </section>

        {/* Bagian Testimoni (Sudah ada) */}
        <section id="testimonials" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="max-w-lg">
                <p className="text-green-600 font-semibold mb-2">Ulasan</p>
                <h2 className="text-3xl font-bold mb-4">
                  Testimoni yang Menginspirasi Kami
                </h2>
                <p className="text-gray-600 mb-6">
                  Kami selalu senang menerima ulasan positif dari pelanggan
                  kami. Setiap testimoni memberi semangat bagi tim kami untuk
                  terus memberikan pelayanan terbaik.
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

        {/* Bagian Ajakan Bertindak (Call to Action) - BARU */}
        <section className="py-20 container mx-auto px-4 bg-blue-700 text-white text-center rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Siap untuk Hidup Lebih Sehat?</h2>
            <p className="text-lg mb-8">
                Jelajahi berbagai produk dan layanan kesehatan kami sekarang juga.
            </p>
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition">
                Mulai Belanja
            </button>
        </section>

      </div>
    </div>
  );
}
