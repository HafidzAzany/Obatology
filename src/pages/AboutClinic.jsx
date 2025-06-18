import React from "react";

export default function AboutClinic() {
  return (
    <div className="bg-white text-[#0b0b0b]">
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="max-w-lg">
            <p className="text-green-600 font-semibold mb-2">Team</p>
            <h2 className="text-3xl font-bold mb-4">
              The Heart of Our Pharmacy
            </h2>
            <p className="text-gray-600 mb-6">
              Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet
              suscipit nulla. Nullam vitae sit tempus diam.
            </p>
          </div>
          <div>
            <button className="border rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition">
              All Team
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div>
            <div className="bg-gray-800 h-60 mb-4 rounded-xl"></div>
            <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
              Chief Pharmacist
            </span>
            <h4 className="font-semibold">Dr. Emily Roberts, PharmD</h4>
            <p className="text-gray-500 text-sm">Work experience - 15 years</p>
          </div>
          <div>
            <div className="bg-gray-800 h-60 mb-4 rounded-xl"></div>
            <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
              Medical Advisor
            </span>
            <h4 className="font-semibold">Dr. Michael Chang, MD</h4>
            <p className="text-gray-500 text-sm">Work experience - 12 years</p>
          </div>
          <div>
            <div className="bg-gray-800 h-60 mb-4 rounded-xl"></div>
            <span className="inline-block bg-gray-200 text-xs px-3 py-1 rounded-full mb-2">
              Director of Health Services
            </span>
            <h4 className="font-semibold">Lisa Davis, RN, BSN</h4>
            <p className="text-gray-500 text-sm">Work experience - 8 years</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-lg">
              <p className="text-green-600 font-semibold mb-2">Review</p>
              <h2 className="text-3xl font-bold mb-4">
                Testimonials That Inspire Us
              </h2>
              <p className="text-gray-600 mb-6">
                Libero diam auctor tristique hendrerit in eu vel id. Nec leo
                amet suscipit nulla. Nullam vitae sit tempus diam.
              </p>
            </div>
            <div>
              <button className="border rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition">
                All Review
              </button>
            </div>
          </div>

          <div className="bg-white shadow p-6 rounded-lg mt-10 max-w-xl">
            <p className="italic text-gray-700 mb-4">
              "Pharmacy Store is my go-to for over-the-counter medications and
              health products. They have a wide selection, and their website
              makes it easy to order online. The only improvement I'd suggest is
              expanding their beauty and skincare section."
            </p>
            <p className="font-semibold text-sm">Theresa J. Jones</p>
            <p className="text-gray-400 text-xs">24 years old</p>
          </div>
        </div>
      </section>
    </div>
  );
}
