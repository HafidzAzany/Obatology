import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function AboutClinic() {
  const testimonials = [
    {
      quote:
        "Pharmacy Store adalah tempat andalan saya untuk mendapatkan obat bebas...",
      name: "Zee",
      age: "24 tahun",
      image:
        "https://nuansabengkulu.com/wp-content/uploads/2024/09/457183704_815335494136788_9187943780702302956_n.jpg",
    },
    {
      quote:
        "Layanan hebat dan pengiriman cepat! Saya selalu menemukan apa yang saya butuhkan...",
      name: "Sarah J., Jakarta",
      age: "32 tahun",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      quote: "Dukungan pelanggan yang luar biasa dan harga terjangkau...",
      name: "Rudi H., Bandung",
      age: "29 tahun",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="bg-blue-50 text-gray-800">
      {/* Our Story */}
      <section
        className="py-16 container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-lg mb-10"
        data-aos="fade-up"
      >
        <div className="flex-1" data-aos="fade-right" data-aos-delay="100">
          <h2 className="text-3xl font-bold mb-3 text-green-700">Our Story</h2>
          <p className="text-gray-700">
            Obatology Store berdiri sejak 2005 untuk memudahkan akses obat dan
            produk kesehatan berkualitas. Dari apotek kecil kini berkembang
            menjadi platform online terpercaya melayani ribuan pelanggan di
            seluruh Indonesia.
          </p>
        </div>
        <div className="flex-1" data-aos="fade-left" data-aos-delay="200">
          <img
            src="https://png.pngtree.com/background/20230520/original/pngtree-3d-pharmacy-design-for-retail-store-picture-image_2672933.jpg"
            alt="Our Story"
            className="rounded-lg shadow-md w-full object-cover h-64"
          />
        </div>
      </section>

      {/* Tim Kami */}
      <section
        className="py-20 container mx-auto px-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="text-center mb-10">
          <p className="text-blue-500 font-semibold">Tim Kami</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Jantung dari Apotek Kami
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Kami percaya kekuatan apotek terletak pada orang-orang hebat di
            baliknya. Tim profesional kami selalu siap melayani Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Emily Roberts, PharmD",
              role: "Apoteker Utama",
              img: "https://dids.rs/wp-content/uploads/2024/02/emily-roberts-500x500.jpg",
              exp: "15 tahun",
            },
            {
              name: "Dr. Michael Chang, MD",
              role: "Penasihat Medis",
              img: "https://ophthalmology.pitt.edu/sites/default/files/styles/person_image/public/person-img/Chang_Michael.jpg?h=c56afb9f&itok=sOYz-5bA",
              exp: "12 tahun",
            },
            {
              name: "Lisa Davis, RN, BSN",
              role: "Direktur Layanan Kesehatan",
              img: "https://media.licdn.com/dms/image/v2/C5603AQGGAsjFJKoXpA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1530236040392?e=2147483647&v=beta&t=iyJgSxYsgM6xdp5EqmgiJcp6JCqJfZfGTVzECa8YJBw",
              exp: "8 tahun",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">
                  {member.role}
                </span>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-gray-500 text-sm">
                  Pengalaman kerja - {member.exp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-16 container mx-auto px-4 grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg mb-10"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div data-aos="fade-right" data-aos-delay="100">
          <img
            src="https://cdn.kibrispdr.org/data/868/visi-misi-vector-21.svg"
            alt="Misi Kami"
            className="rounded-lg shadow mt-4"
          />
          <h3 className="text-2xl font-bold mb-2 text-green-700">Misi Kami</h3>
          <p className="text-gray-700">
            Memberikan akses mudah ke produk kesehatan berkualitas dengan
            layanan pelanggan yang responsif dan informasi akurat.
          </p>
        </div>
        <div data-aos="fade-left" data-aos-delay="200">
          <h3 className="text-2xl font-bold mb-2 text-blue-500">Visi Kami</h3>
          <p className="text-gray-700">
            Menjadi apotek online terdepan yang dipercaya masyarakat,
            menghadirkan solusi kesehatan inovatif demi kesejahteraan bersama.
          </p>
          <img
            src="https://murnajati.jatimprov.go.id/assets/img/profil-instansi/visimisi.png"
            alt="Visi Kami"
            className="rounded-lg shadow mt-4"
          />
        </div>
      </section>

      {/* Pencapaian */}
      <section
        className="py-16 container mx-auto px-4 bg-white rounded-xl shadow-lg mb-10 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-700">
          Pencapaian Kami
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg" data-aos="flip-left">
            <p className="text-4xl font-bold text-blue-600 mb-2">1 Juta+</p>
            <p className="text-gray-700">Pelanggan Terlayani</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg" data-aos="flip-right">
            <p className="text-4xl font-bold text-green-600 mb-2">200+</p>
            <p className="text-gray-700">Produk Kesehatan</p>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section
        className="py-16 container mx-auto px-4 bg-white rounded-xl shadow-lg mb-10"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
          Testimoni Pelanggan
        </h2>
        <div className="max-w-2xl mx-auto">
          <Slider {...settings}>
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 shadow p-6 rounded-xl flex flex-col items-center text-center"
              >
                <center>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-red-300"
                  />
                </center>
                <p className="italic text-gray-700 mb-4">"{item.quote}"</p>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.age}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-16 bg-blue-600 text-white text-center"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <h2 className="text-3xl font-bold mb-4">
          Siap untuk Hidup Lebih Sehat?
        </h2>
        <p className="mb-6">
          Jelajahi produk & layanan kesehatan kami sekarang juga.
        </p>
        <Link
          to="/products"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Lihat Produk
        </Link>
      </section>
    </div>
  );
}
