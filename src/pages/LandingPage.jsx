import React from "react";
import {
  FaShippingFast,
  FaMoneyCheckAlt,
  FaGift,
  FaHeadset,
} from "react-icons/fa";
import ProductsLanding from "./ProductsLanding"; // sesuaikan path jika berbeda

export default function LandingPage() {
  return (
    <div className="bg-[#050827] text-white">
      {/* Hero Section */}
      <section className="bg-white text-black">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Trusted Pharmacy Store
            </h1>
            <p className="mb-6 text-gray-600">
              Best online pharmacy for all your needs. Fast, reliable, and
              affordable.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              Shop Now
            </button>
          </div>
          <div className="bg-gray-300 h-64 md:h-80 rounded-xl"></div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white text-black py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <FaShippingFast className="mx-auto text-2xl" />,
              label: "Free Shipping",
            },
            {
              icon: <FaMoneyCheckAlt className="mx-auto text-2xl" />,
              label: "Quick Payment",
            },
            {
              icon: <FaGift className="mx-auto text-2xl" />,
              label: "Big Cashback",
            },
            {
              icon: <FaHeadset className="mx-auto text-2xl" />,
              label: "24/7 Support",
            },
          ].map((feature) => (
            <div key={feature.label}>
              <div className="text-2xl font-bold">{feature.icon}</div>
              <p className="mt-2 font-medium">{feature.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="bg-[#f5f7fb] py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">50% Off</h2>
            <p>Get amazing deals on selected items</p>
          </div>
          <div className="bg-blue-600 p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-2">30% Cashback</h2>
            <p>Shop now and earn rewards</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Featured Pharmacy Essentials
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Acetaminophen Pills",
              "Throat Lozenges Syrup",
              "Multivitamin B6+",
            ].map((item) => (
              <div
                key={item}
                className="bg-gray-200 h-48 rounded-xl flex items-center justify-center font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-16 text-black">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Commitment to Quality</h2>
            <div>
              <p className="font-medium">✅ Wide Product Range</p>
              <p className="text-sm text-gray-600">
                From prescription meds to supplements
              </p>
            </div>
            <div>
              <p className="font-medium">✅ Quality Assurance</p>
              <p className="text-sm text-gray-600">
                Top-rated pharmacy practices
              </p>
            </div>
            <div>
              <p className="font-medium">✅ Eco-Friendly Practices</p>
              <p className="text-sm text-gray-600">Sustainable packaging</p>
            </div>
          </div>
          <div className="bg-gray-300 h-64 rounded-xl"></div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-blue-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Comprehensive Pharmacy Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Prescription Filling",
              "Home Delivery",
              "Health Consultations",
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

      {/* Testimonials */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Testimonials That Inspire Us
          </h2>
          <div className="bg-gray-100 p-8 rounded-xl">
            <p className="italic mb-2">
              "Pharmacy Store is my go-to for over-the-counter meds and
              supplements. Great value and super reliable."
            </p>
            <p className="font-semibold">— Sarah J., Jakarta</p>
          </div>
        </div>
      </section>
    </div>
  );
}
