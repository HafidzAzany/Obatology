export default function FooterLanding() {
  return (
    <footer className="bg-[#03061f] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-bold text-lg mb-2">Obatology</h3>
          <p className="text-gray-400">
            Solusi cerdas untuk kebutuhan kesehatan Anda. Aman, cepat, dan
            terpercaya.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Navigasi</h4>
          <ul className="space-y-1">
            <li>
              <a href="#promo" className="hover:text-cyan-400">
                Promo
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-cyan-400">
                Produk
              </a>
            </li>
            <li>
              <a href="#whyus" className="hover:text-cyan-400">
                Kenapa Kami
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-cyan-400">
                Testimoni
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Ikuti Kami</h4>
          <div className="flex space-x-3">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
            >
              FB
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
            >
              IG
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
            >
              X
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10 text-xs">
        &copy; {new Date().getFullYear()} Obatology. All rights reserved.
      </div>
    </footer>
  );
}
